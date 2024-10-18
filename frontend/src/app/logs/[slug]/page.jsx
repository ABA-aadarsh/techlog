"use server";
import { backendRoute } from '@/app/util'
import React from 'react'
import {notFound} from "next/navigation"
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import { fetchLog } from './getData';
import HTMLStyler from '@/app/components/HTMLStyler';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import ScrollLinkForHeadings from './_components/ScrollLinkForHeadings';

// generate static params
export async function generateStaticParams() {
    const res = await fetch(backendRoute + "/logs")
    const {data} = await res.json()
    return data.map((log)=>({
        slug: log.slug
    }))
}

// generate metadata
export async function generateMetadata({params}) {
    const {status, payload} = await fetchLog(params.slug)
    if(status==false){
        return {
            title: "Log not found",
            description: "Log not found"
        }
    }
    return {
        title: payload.metaData.title,
        description: payload.metaData.description   
    }
}

const page =async ({params}) => {
    const {status, payload} = await fetchLog(params.slug)
    if(status==false){
        notFound()
    }
    const logData = payload.logData
    const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
        theme: 'one-dark-pro',
    })
    .use(rehypeStringify)
    let htmlContent = String(await processor.process(logData.content))
    const globalFindRegex = /<h2[^>]*>(.*?)<\/h2>/g
    const localFindRegex = /<h2[^>]*>(.*?)<\/h2>/
    // logs headings for navigations are as H2
    const headings = htmlContent.match(globalFindRegex)?.map(h=>{
        const contentMatch = h.match(localFindRegex)
        return contentMatch[1]
    })
    htmlContent = htmlContent.replace(globalFindRegex, (tagMatch)=>{
        const contentMatch = tagMatch.match(localFindRegex)
        let url = ""
        let content = ""
        if(contentMatch){
            url = contentMatch[1].trim().replace(/ /g, "-").toLowerCase()
            content = contentMatch[1]
        }
        return `
            <h2
                id="${url}"
            >
                ${content}
            </h2>
        `
    })
  return (
    <>
        <main className='mt-5 relative'>
            <article className='mb-10'>
                <div>
                    {/* heading */}
                    <div className="mb-10 flex flex-col">
                        <h1
                        className='text-4xl font-semibold text-zinc-900 text-left mb-2'
                        >{logData.title}</h1>
                        <span className='mb-2 block'>Updated at : {(new Date(logData.updatedAt)).toDateString()}</span>
                        <div className='flex items-center gap-2 justify-end'>
                            {
                                logData.tags && logData.tags.map((tag, _)=>(
                                    <span
                                        className="text-sm text-white mr-2 rounded-md bg-neutral-800 py-1 px-2"
                                        key={_}
                                    >{tag}</span>
                                ))
                            }
                        </div>
                    </div>
                    <hr className=" block mb-10"/>
                </div>
                <HTMLStyler html={htmlContent}/>
            </article>
        </main>
        <div className="fixed top-20 left-10">
            <h3
                className='text-xl font-semibold text-zinc-900 text-left mb-4'
            >Table of Contents</h3>
            <ol className="pl-2 flex flex-col gap-4 list-decimal">
                {headings && headings.map((heading, _)=>(
                    <li key={_}
                        className="hover:pl-2 duration-200 transition-all"
                    >
                        <ScrollLinkForHeadings heading={heading}/>
                    </li>
                ))}
            </ol>
        </div>
    </>
  )
}

export default page






/*
    '<h1>Meow</h1><h2>hello</h2><h2>Bow dow</h2>'.replace(regex, (tagMatch)=>{
  const contentMatch = tagMatch.match(/<h2>(.*?)<\/h2>/)
  let url = ""
  let content = ""
  if(contentMatch && contentMatch[1]){
    url = contentMatch[1].trim().replaceAll(/ /g, "-").toLowerCase()
    content = contentMatch[1]
  }
  return `
    <h2 id="${url}">
    ${content}
    </h2>
  `
})
*/
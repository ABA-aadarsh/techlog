"use server";
import { backendRoute } from '@/app/util'
import React from 'react'
import {notFound} from "next/navigation"
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import { fetchLog } from './getData';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import HTMLStyler from '@/app/components/HTMLStyler';

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
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypePrettyCode, {
      theme: "one-dark-pro",
      defaultLang: "plaintext",
      transformers: [
        transformerCopyButton({
          visibility: 'always',
          feedbackDuration: 3_000,
        })
      ]
    })
    let htmlContent = String(await processor.process(logData.content))
    const globalFindRegex = /<h2[^>]*>(.*?)<\/h2>/g
    const localFindRegex = /<h2[^>]*>(.*?)<\/h2>/
    // logs headings for navigations are as H2
    const headings = htmlContent.match(globalFindRegex).map(h=>{
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
        <main className='mt-5'>
            <article className='mb-10'>
                <div>
                    {/* heading */}
                    <div className="mb-10">
                        <h1
                        className='text-4xl font-semibold text-zinc-900 text-left mb-2'
                        >{logData.title}</h1>
                        <span>{String(logData.updatedAt)}</span>
                    </div>
                    <hr className=" block mb-10"/>
                    <div>
                        {/* <span>{String(logData.updatedAt)}</span> */}
                        <div>
                            {/* {logData.tags.map((tag, _)=>(
                                <span key={_}>
                                    {tag}
                                </span>
                            ))} */}
                        </div>
                    </div>
                </div>
                <HTMLStyler html={htmlContent}/>
            </article>
            <div className="sticky top-0">
                <ul>
                    {headings.map((heading, _)=>(
                        <li key={_}>
                            <a href={`#${heading.trim().toLowerCase().replaceAll(/ /g, "-")}`}>{heading}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
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
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
    const htmlContent = await processor.process(logData.content)
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
                <HTMLStyler html={String(htmlContent)}/>
            </article>
        </main>
  )
}

export default page
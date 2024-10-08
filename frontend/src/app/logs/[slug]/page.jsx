"use server";
import { backendRoute } from '@/app/util'
import React from 'react'
import {notFound} from "next/navigation"
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import { fetchLog } from './getData';
import Link from 'next/link';

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
    const htmlContent = await processor.process(logData.content)
  return (
    <>
        <nav>
            <ul>
                <li>
                    <Link href={"/"}>Logs</Link>
                </li>
            </ul>
        </nav>
        <main>
            <article className='prose dark:prose-invert'>
                <div>
                    {/* heading */}
                    <h1>{logData.title}</h1>
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
                <div dangerouslySetInnerHTML={{__html:String(htmlContent)}}></div>
            </article>
        </main>
    </>
  )
}

export default page
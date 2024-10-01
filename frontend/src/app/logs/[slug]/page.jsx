"use server";
import { backendRoute } from '@/app/util'
import React from 'react'
import {notFound} from "next/navigation"
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';

const page =async ({params}) => {
    const fetchLog = async  (slug="") => {
        const apiRoute = backendRoute+`/logs/${slug}`
        const res = await fetch(apiRoute,{
            method:"GET"
        })
        if(res.status==201){
            const {data: logdata} = await res.json()
            return logdata
        }else{
            notFound()

        }
    }
    const logData = fetchLog(params.slug)
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
                        <span>{String(i.updatedAt)}</span>
                        <div>
                            {logData.tags.map((tag, _)=>(
                                <span key={_}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{__html:htmlContent}}></div>
            </article>
        </main>
    </>
  )
}

export default page
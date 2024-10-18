"use client";
import React, { useEffect, useState } from 'react'
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import matter from "gray-matter"
import remarkGfm from 'remark-gfm';
const Preview = ({content}) => {
  const [previewhtml, setPreviewhtml] = useState("")
  const [loading, setLoading] = useState(true)
  const processMarkdown = async (md) => {
    try {
      const { content: mdContent } = matter(md);
      setLoading(true);
      const file =  unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
      const htmlData = await file.process(mdContent);
      setPreviewhtml(String(htmlData));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    processMarkdown(content)
  },[content])
  if(loading) {
    return (
      <div><h1>Loading</h1></div>
    )
  }
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: previewhtml
      }}

      className="
        h-full overflow-auto prose dark:prose-invert
        prose-h2:font-semibold
        prose-h2:text-3xl
        prose-h2:leading-9
        prose-h2:before:content-['#']
        prose-h2:cursor-pointer
        prose-h2:mb-8
        prose-h2:mt-8
        prose-img:rounded-md
        prose-img:mx-auto
        prose-img:max-w-[80%]
        max-w-[800px]
        w-full
      "
    ></div>
  )
}

export default Preview
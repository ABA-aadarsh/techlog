"use client";
import React, { useEffect, useState } from 'react'
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';

const Preview = ({title,content,tags}) => {
  const [previewhtml, setPreviewhtml] = useState("")
  const [loading, setLoading] = useState(true)
  const processMarkdown = async (content)=>{
    setLoading(true)
    const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    const htmlContent = await processor.process(content)
    setPreviewhtml(htmlContent)
    setLoading(false)
  }
  useEffect(()=>{
    processMarkdown(content)
    console.log(content)
  },[content])
  if(loading) {
    return (
      <div><h1>Loading</h1></div>
    )
  }
  return (
    <div className='prose dark:prose-invert' dangerouslySetInnerHTML={{__html:previewhtml}}>
    </div>
  )
}

export default Preview
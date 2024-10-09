"use client";
import React, { useEffect, useState } from 'react'
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import matter from "gray-matter"
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers';
import HTMLStyler from '@/app/components/HTMLStyler';
const Preview = ({title,content,tags}) => {
  const [previewhtml, setPreviewhtml] = useState("")
  const [loading, setLoading] = useState(true)
  const processMarkdown = async (md)=>{
    // meta data inside markdown is retrieved and not displayed for preview
    const {content: mdContent} = matter(md)
    setLoading(true)
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
    const htmlContent = await processor.process(mdContent)
    setPreviewhtml(String(htmlContent))
    console.log(htmlContent)
    console.log(String(htmlContent))
    setLoading(false)
  }
  useEffect(()=>{
    processMarkdown(content)
  },[content])
  if(loading) {
    return (
      <div><h1>Loading</h1></div>
    )
  }
  return (
    <HTMLStyler
      html={previewhtml}
    />
  )
}

export default Preview
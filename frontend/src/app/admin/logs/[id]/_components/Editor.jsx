"use client";
import React from 'react'

const Editor = ({content, updateContent}) => {
  return (
    <textarea value={content}
      className="h-full w-full resize-none bg-transparent text-black dark:text-white outline-none
        overflow-y-auto
      "
      onChange={(e)=>updateContent(e.target.value)}
    >
    </textarea>
  )
}

export default Editor
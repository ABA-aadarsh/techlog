"use client";
import React from 'react'

const Editor = ({content, updateContent}) => {
  return (
    <textarea value={content}
      onChange={(e)=>updateContent(e.target.value)}
    >
    </textarea>
  )
}

export default Editor
import React from 'react'

const HTMLStyler = ({html}) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html
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

export default HTMLStyler
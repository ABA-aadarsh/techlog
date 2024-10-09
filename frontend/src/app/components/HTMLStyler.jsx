import React from 'react'

const HTMLStyler = ({html}) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html
      }}

      className="
        h-full overflow-auto prose dark:prose-invert
        prose-h1:text-2xl
        prose-h2:text-xl
        prose-h3:text-lg
        prose-h4:text-base
        prose-h5:text-sm
        prose-h6:text-xs
        prose-h1:font-semibold
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
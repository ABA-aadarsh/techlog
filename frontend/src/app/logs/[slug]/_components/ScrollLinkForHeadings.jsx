"use client"
import React from 'react'

const ScrollLinkForHeadings = ({heading}) => {
  const targetElementId = heading.trim().toLowerCase().replaceAll(/ /g, "-")
  return (
    <a href={`#${targetElementId}`}
      onClick={(e)=>{
        e.preventDefault()
        const targetElement = document.getElementById(targetElementId)
        if(targetElement){
          const y = targetElement.getBoundingClientRect().top + window.scrollY
          window.scrollTo({top: y - 100, behavior: "smooth"})
        }
      }}
    >
      {heading}
    </a>
  )
}

export default ScrollLinkForHeadings
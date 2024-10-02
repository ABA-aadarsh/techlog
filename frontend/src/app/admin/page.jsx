"use client"
import React from 'react'

function page() {
  // middleware will make sure that only admin gets to this page
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center py-4'>Admin Page</h1>

      <div>
      </div>
    </div>
  )
}

export default page
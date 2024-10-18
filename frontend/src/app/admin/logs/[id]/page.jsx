"use server"
import { revalidatePath, revalidateTag } from 'next/cache'
import React from 'react'
import ClientWrapper from './ClientWrapper'

const page = ({params}) => {
    console.log(params)
    const pathRevalidator = async (slug) => {
        "use server"
        revalidatePath(`/logs/${slug}`)
        revalidateTag("logs")
        revalidatePath("/")
    }
  return (
    <div>
      <ClientWrapper 
        logId={params.id}
        pathRevalidator={pathRevalidator}
      />
    </div>
  )
}

export default page
"use server"
import { revalidatePath, revalidateTag } from 'next/cache'
import React from 'react'
import ClientWrapper from './ClientWrapper'

const page = ({params}) => {
    const pathRevalidator = async (slug) => {
        "use server"
        revalidatePath(`/logs/${slug}`)
        revalidateTag("logs")
        revalidatePath("/")
    }
  return (
    <div>
        <ClientWrapper pathRevalidator={pathRevalidator}
            params={params}
        />
    </div>
  )
}

export default page
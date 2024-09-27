import React from 'react'
import { auth } from "@/app/auth"
import { SignOut } from './_components/signout'

async function page() {
  // middleware will make sure that only admin gets to this page
  const session = await auth()
  return (
    <div>
      <h1>Admin Page</h1>

      <div>
        <SignOut />
      </div>
    </div>
  )
}

export default page
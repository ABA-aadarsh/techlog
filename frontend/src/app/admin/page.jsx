import React from 'react'
import {auth} from "@/app/auth"
import { SignOut } from './_components/signout'

async function page() {
    const session = await auth()
  return (
    <div>
        <h1>Admin Page</h1>

        <div>
            <SignOut/>
        </div>
    </div>
  )
}

export default page
import React from 'react'
import SignIn from './_components/signin'
import { auth } from '../auth'
async function page() {
    const session = await auth()
    if(session && session.user){
        return <div>You are loggedin</div>
    }
    return (
        <div>
            <h1>Admin Login Page</h1>
            <SignIn />
        </div>
    )
}

export default page
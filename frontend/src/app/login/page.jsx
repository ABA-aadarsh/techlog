"use server"
import React from 'react'
import SignIn from './_components/signin'
import { auth } from '../auth'
async function page() {
    const session = await auth()
    if(session && session.user && session.user.email==process.env.ADMIN_EMAIL){
        return (<div
            className="w-dvw h-dvh flex items-center justify-center"
        >
            <h1 className='text-3xl font-semibold text-center py-4'>Logged in</h1>
        </div>)
    }
    return (
        <div className='flex flex-col items-center'>
            <div className='max-w-[700px] mx-auto w-4/5 p-10 mt-20'>
                <h3 className='font-bold text-3xl text-center mb-10'>Admin Login</h3>
                <div className='w-full flex items-center justify-center'>
                    <SignIn className=''/>
                </div>
            </div>
            {/* <div className='max-w-[700px] mx-auto w-4/5 absolute bottom-0 left-auto right-auto'>
                <div className='border-2 p-5 rounded-t-lg  border-zinc-500 max-w-[400px] mx-auto bg-slate-50s '>
                    <p>You need to be logged in to comment on the log posts. Your email are not stored on our server.</p>
                </div>
            </div> */}
        </div>
    )
}

export default page
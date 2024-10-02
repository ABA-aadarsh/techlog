import React from 'react'
import SignIn from './_components/signin'
import { auth } from '../auth'
async function page() {
    const session = await auth()
    if(session && session.user){
        return <div>You are loggedin</div>
    }
    return (
        <div className='flex flex-col items-center'>
            <div className='max-w-[700px] mx-auto w-4/5 p-10 mt-20'>
                <h1 className='font-bold text-3xl text-center mb-10'>Login</h1>
                <div className='w-full flex items-center justify-center'>
                    <SignIn className=''/>
                </div>
            </div>
            <div className='max-w-[700px] mx-auto w-4/5 absolute bottom-0 left-auto right-auto'>
                <div className='border-2 p-5 rounded-t-lg  border-zinc-500 max-w-[400px] mx-auto bg-slate-50s '>
                    <p>You need to be logged in to comment on the log posts. Your email are not stored on our server.</p>
                </div>
            </div>
        </div>
    )
}

export default page
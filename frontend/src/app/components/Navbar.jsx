"use client"
import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { useEffect } from 'react'
// import {useSession} from "next-auth/react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {useRouter} from "next/navigation"
// import User from './User'

const Navbar = ({}) => {
    // const {data: session, status} = useSession ()
    // const isLoading = status === "loading"
  return (
    <header className='flex justify-center sticky top-0 bg-white dark:bg-slate-800 z-40'>
        <div className='w-full py-4 flex items-center justify-between border-b-2'>
            <nav>
                <ul className='flex items-center gap-4'>
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/projects"}>Projects</Link>             
                    </li>
                </ul>
            </nav>
            {/* user account */}
            {/* <div className='flex items-center gap-4'>
                <div className='w-10 h-10'>
                    {isLoading?
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>:
                        <>
                            {(session) ?
                                <User
                                    image={session.user.image}
                                    name={session.user.name}
                                ></User>
                                :
                                <Link href={"/login"}
                                    className={buttonVariants({variant: "outline"})}
                                >Login</Link>
                            }
                        </>
                    }
                </div>
            </div> */}
        </div>
    </header>
  )
}

export default Navbar
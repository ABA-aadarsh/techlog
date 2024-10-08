"use client"
import React from 'react'
import Link from 'next/link'
import {useSession} from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useRouter} from "next/navigation"
import User from './User'
import { buttonVariants } from '@/components/ui/button'

const Navbar = ({}) => {
    const homeTitle = "Home"
    const router = useRouter()
    const {data: session, status} = useSession ()
    const isLoading = status === "loading"
  return (
    <nav className='flex justify-center'>
        <div className='w-full py-4 flex items-center justify-between'>
            <ul className='flex items-center gap-4'>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/projects"}>Projects</Link>             
                </li>
                <li>
                    <Link href={"/logs"}>Logs</Link>
                </li>
            </ul>
            
            <div className='flex items-center gap-4'>

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
            </div>
        </div>
    </nav>
  )
}

export default Navbar
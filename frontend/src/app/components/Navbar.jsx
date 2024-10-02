"use client"
import React from 'react'
import Link from 'next/link'
import {useSession} from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useRouter} from "next/navigation"
import User from './User'

const Navbar = ({}) => {
    const homeTitle = "Home"
    const router = useRouter()
    const {data: session, status} = useSession ()
    const isLoading = status === "loading"
  return (
    <nav className='flex justify-center'>
        <div className='w-full px-4 py-4 flex items-center justify-between'>
            <div>
                <Link href={"/"}>
                    <h1>{homeTitle}</h1>
                </Link>
            </div>
            <div>
                <ul className='flex items-center gap-4'>
                    <li>
                        <Link href={"/projects"}>Projects</Link>             
                    </li>
                    <li>
                        <Link href={"/logs"}>Logs</Link>
                    </li>
                </ul>

                <div>
                    {isLoading?
                        "...":
                        <>
                            {(session) ?
                                <User
                                    image={session.user.image}
                                    name={session.user.name}
                                ></User>
                                :
                                <button
                                    onClick={()=>router.push("/login")}
                                >Login</button>
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
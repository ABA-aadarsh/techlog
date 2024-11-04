import { Linkedin, PenLine } from 'lucide-react'
import React from 'react'
import { GithubLogo } from '../_svgs/GithubLogo'
import Link from 'next/link'

const Footer = () => {
    const socialLinks = [
        {
            link: "#",
            icon: GithubLogo
        },
        {
            link: "#",
            icon: Linkedin
        }
    ]
  return (
    <footer className='bg-zinc-100 border-2 rounded-md px-5 flex items-center shadow-sm h-[80px] mb-5'>
        <div className='flex items-center justify-between w-full'>
            <div >
                <Link href={"/"} className='flex items-center gap-2 hover:text-blue-800'>
                    <PenLine size={20} />
                    <h1 className='text-lg font-semibold'>TechLog</h1>
                </Link>
            </div>
            <div>
                <p aria-description='emailaddress' className='text-slate-600'>aadarshbandhuaryal@gmail.com</p>
            </div>
            <div>
                <ul className='flex items-center gap-4'>
                    {
                        socialLinks.map(
                            i=>(
                                <li key={i.icon}>
                                    <Link href={i.link} >
                                        <i.icon size={20} />
                                    </Link>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer
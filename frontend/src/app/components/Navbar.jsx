import React from 'react'
import Link from 'next/link'
const Navbar = () => {
    const homeTitle = "Home"
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
            </div>
        </div>
    </nav>
  )
}

export default Navbar
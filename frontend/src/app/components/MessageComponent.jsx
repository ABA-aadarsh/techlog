import Link from 'next/link'
import React from 'react'

function MessageComponent() {
    const topProjects = [
        {
            name: "Name 1",
            link: "/projects/1"
        },
        {
            name: "Name 2",
            link: "/projects/2"
        },
        {
            name: "Name 3",
            link: "/projects/3"
        }
    ]
  return (
    <div className='mb-10 flex items-center gap-5 justify-between'>
        <span>Checkout Ongoing Projects</span>
        <ul className='flex items-center gap-4 justify-between'>
            {
                topProjects.map((i,_)=>(
                    <li key={_}>
                        <Link href={i.link}>
                            {i.name}
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default MessageComponent
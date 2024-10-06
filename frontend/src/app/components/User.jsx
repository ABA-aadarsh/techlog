"use client";
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { getCsrfToken } from 'next-auth/react';

const User = ({image, name}) => {
    const handleSignOut = async ()=>{
        const csrfToken = await getCsrfToken();
        await fetch('/api/auth/signout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
            csrfToken: csrfToken,
            }),
        });
        window.location.href = "/"
    }
    const [openBox, setOpenBox] = useState(false)
    return (
        <div className='relative'>
            <Avatar className="cursor-pointer" onClick={() => setOpenBox(!openBox)}
                style={{ width: '40px', height: '40px' }}>
                <AvatarImage src={image} />
                <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div className={`flex flex-col ${openBox ? "block" : "hidden"} absolute right-0 top-14 
            bg-slate-50 rounded-lg border-2 border-zinc-500 p-2`}>
                <div className='bg-white p-5  rounded-lg border-b-2 border-zinc-500' >
                    <img src={image} className="w-10 h-10 rounded-full"></img>
                    <p className="ml-2">{name}</p>
                </div>
                <div className='bg-white p-2 rounded-lg'>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                </div>
            </div>
        </div>
    )
}

export default User
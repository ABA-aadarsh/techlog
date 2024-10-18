"use client"
import { getCsrfToken } from 'next-auth/react';
import React from 'react'

function page() {
  // middleware will make sure that only admin gets to this page
  const handleSignOut = async () => {
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
  return (
    <div>
      <div>
        <h1 className='text-3xl font-semibold text-center py-4'>Admin Page</h1>
        <button
          onClick={handleSignOut}
          className="underline underline-offset-2"
        >/logout</button>
      </div>

      <div>
      </div>
    </div>
  )
}

export default page
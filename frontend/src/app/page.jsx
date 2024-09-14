import React from 'react'
import Navbar from './components/Navbar'
import MessageComponent from './components/MessageComponent'

function page() {
  const description = "A Programming Enthusiast sharing his projects and programming stuffs"
  const showMessage = true
  const blogsList = []
  return (
    <div className='max-w-[700px] mx-auto w-4/5'>
      <Navbar/>
      <main className='mx-auto'>
        <div className='mb-10'>
          <h2 className='text-center'>{description}</h2>
        </div>
        {
          showMessage &&
          <MessageComponent/>
        }
        <div>

        </div>
      </main>
    </div>
  )
}

export default page
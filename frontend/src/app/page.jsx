import React from 'react'
import Navbar from './components/Navbar'
import MessageComponent from './components/MessageComponent'
import { backendRoute } from './util'
import { notFound } from 'next/navigation'
import { signOut } from '@/app/auth'
const fetchlogsList = async ()=>{
  try {
    const apiRoute = backendRoute + "/logs"
    const res = await fetch(apiRoute)
    if(res.status == 200){
      const {data} = await res.json()
      return data
    }else{
      notFound()
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}

async function page() {
  const blogsList = await fetchlogsList()
  const programmingParadigms = ["web", "temrinal", "compiler"]
  return (
    <div className='max-w-[700px] mx-auto w-4/5'>
      <Navbar/>
      <main className='mx-auto'>
        <div>
          <div>
            <h1>Aadarsh's TechLog</h1>
            <a href="https:://github.com/aba-aadarsh">@aba-aadarsh</a>
            <div>
              contact links
            </div>
          </div>
          <div>
            <p>Writing about the details about my projects, and the building process on various interests.</p>
            <p>
              <span>Currently interested on </span>
                {
                  programmingParadigms.map((i,_)=>(
                    <span key={_}>
                      {i}
                    </span>
                  ))
                }
            </p>
          </div>
        </div>


        <div>
          <ul>
            {
              blogsList.map((i,_)=>(
                <li key={_} className='mb-2'>
                  <h2 className='text-lg font-semibold'>{i.title}</h2>
                  <p className='text-sm text-gray-500'>{i.updatedAt}</p>
                  <ul className='flex flex-wrap'>
                    {
                      i.tags.map((j,__)=>(
                        <li key={__} className='mr-2 mb-2 px-2 py-1 border rounded'>{j}</li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
      </main>

    </div>
  )
}

export default page
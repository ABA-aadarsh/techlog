import React from 'react'
import Navbar from './components/Navbar'
import { backendRoute } from './util'
import { notFound } from 'next/navigation'
import { GithubLogo } from './_svgs/GithubLogo'
import GmailDialog from './components/GmailDialog'
import { buttonVariants } from '@/components/ui/button'
import { Linkedin } from 'lucide-react'
import Link from 'next/link'
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
    <div className='max-w-[700px] px-2 w-4/5 mx-auto'>
      <Navbar/>
      <main className='mt-5'>
        <div>
          <div className="mb-5">
            <h1 className='text-3xl font-bold text-zinc-900 inline-block'>Aadarsh's TechLog</h1>
            <a href="https:://github.com/aba-aadarsh"
              className='ml-2 text-sm hover:text-blue-500 text-zinc-500'
            >@aba-aadarsh</a>
            
          </div>
          <div className="mb-5">
            <p className = "text-lg mb-1">Writing about the details about my projects, and the building process on various interests.</p>
            <p className = "text-lg text-center">
              <span className="mr-3">Currently interested on </span>
                {
                  programmingParadigms.map((i,_)=>(
                    <span key={_} className="text-zinc-800 inline-block mr-3 
                      bg-zinc-300 p-1 px-2 rounded-lg
                    ">
                      {i}
                    </span>
                  ))
                }
            </p>
          </div>
          <div className='flex items-center gap-4 my-5 justify-center'>
              {/* contact links */}
              <ul className='flex items-center gap-4'>
                <li className={buttonVariants({variant:'outline'})+ " cursor-pointer"}>
                  <Link href="https://github.com/aba-aadarsh">
                    <GithubLogo size={20}/>
                  </Link>
                </li>
                <li className={buttonVariants({variant:'outline'})+ " cursor-pointer"}>
                  <GmailDialog/>
                </li>
                <li className={buttonVariants({variant:'outline'})+ " cursor-pointer"}>
                  <Link href="https://www.linkedin.com/in/aadarshbandhuaryal/">
                    <Linkedin size={20}/>
                  </Link>
                </li>
              </ul>

            </div>
        </div>


        <div>
          <ul>
            {
              blogsList.map((i,_)=>(
                <li key={_} className='mb-2'>
                  <Link href={`/logs/${i.slug}`}>
                    <h2 className='text-lg font-semibold'>{i.title}</h2>
                  </Link>
                  <p className='text-sm text-gray-500'>{i.updatedAt}</p>
                  <ul className='flex flex-wrap'>
                    {
                      (Array.isArray(i.tags) && i.tags.length>0) &&
                      i.tags.map((j,_)=>(
                        <li key={_} className='mr-2 mb-2 px-2 py-1 border rounded'>{j}</li>
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
import React from 'react'
import { backendRoute } from './util'
import { notFound } from 'next/navigation'
import { GithubLogo } from './_svgs/GithubLogo'
import GmailDialog from './components/GmailDialog'
import { buttonVariants } from '@/components/ui/button'
import { Linkedin, Notebook } from 'lucide-react'
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

export const metadata = {
  title: "ABA-TechLog",
  description: "Technical Log Website of Aadarsh Bandhu Aryal (aba-aadarsh)",
};

async function page() {
  const blogsList = await fetchlogsList()
  const programmingParadigms = ["web", "temrinal", "compiler"]
  return (
      <main className='mt-5'>
        <div>
          <div className="mb-5">
            <h1 className='text-3xl font-bold text-zinc-900 inline-block'>Aadarsh's TechLog</h1>
            <a href="https:://github.com/aba-aadarsh"
              className='ml-2 text-sm hover:text-blue-500 text-zinc-500'
            >@aba-aadarsh</a>
            
          </div>
          <div className="mb-5">
            <p className = "text-lg mb-5">Writing about the details about my projects, and the building process on various interests.</p>
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
                <GmailDialog/>
                <li className={buttonVariants({variant:'outline'})+ " cursor-pointer"}>
                  <Link href="https://www.linkedin.com/in/aadarshbandhuaryal/">
                    <Linkedin size={20}/>
                  </Link>
                </li>
              </ul>

            </div>
        </div>


        <div className="mb-10">
          <h1 className='text-2xl font-bold mb-5'>Logs</h1>
          <hr className='mb-5 block'/>
          <div className='flex flex-col gap-7'>
            {
              blogsList.map((i,_)=>(
                <div key={_} >
                  <div className='flex flex-col gap-1 mb-3'>
                    <p className='text-sm text-gray-500'>{(new Date(i.updatedAt)).toDateString()}</p>
                    <Link href={`/logs/${i.slug}`}
                      className='flex items-center gap-2 hover:text-blue-700 transition-colors duration-200'
                      prefetch={false}
                    >
                      <Notebook size={20}/>
                      <h2 className='text-2xl font-medium'>{i.title}</h2>
                    </Link>
                  </div>
                  <div className='pl-7'>
                    {
                      i.tags && i.tags.map((tag,_)=>(
                        <span key={_} className="text-sm text-white mr-2 rounded-md bg-neutral-800 py-1 px-2">
                          {tag}
                        </span>
                      ))
                    }
                  </div>
                </div>
              ))
            }
            <span className='block w-full text-center italic'>End of Logs</span>
          </div>
        </div>
      </main>
  )
}

export default page
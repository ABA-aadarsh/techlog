"use client";
import React, { useEffect, useState } from 'react'
import AddNewForm from './_components/AddNewForm';
import Link from 'next/link';
import { backendRoute } from '@/app/util';
import adminApiClient from '@/app/admin/adminApiClient';

const page = () => {
    const limit = 10; // no of titles per one request
    const [noMoreLogs, setNoMoreLogs] = useState(false)
    const [listLoading, setListLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [logsList, setLogsList] = useState([])
    const getLogsList = async (page=1)=>{
        // initial load and load more logs TODO: store these datas in local storage along with time expiration settings
        try {
            if(logsList.length==0) setListLoading(true);
            
            const storedLogs = localStorage.getItem('adminLogsList')
            const listExpire = localStorage.getItem("listexprire")
            if(listExpire && listExpire < Date.now()) {
                // local storage expired   
            }
            else if(storedLogs != null && logsList.length==0 ){
                const parsedLogs = JSON.parse(storedLogs)
                if(parsedLogs.length>0){
                    setLogsList(parsedLogs)
                    setListLoading(false)
                    return
                }
            }


            console.log("Fetching logs")
            const apiRoute = backendRoute+`/logs/adminPrivate?page=${page}&limit=${limit}`
            const res = await adminApiClient(apiRoute)
            const responseStatus = res.status
            if(responseStatus == 200) {
                const {data: list} = await res.json()
                setLogsList((prev)=>{
                    list.forEach(i=>{
                        if( prev.findIndex(j=>j._id==i._id) == -1 ){
                            prev.push(i)
                        }
                    })
                    return prev
                })
                localStorage.setItem('adminLogsList', JSON.stringify(list))
                localStorage.setItem("listexprire", Date.now() + 10 * 60 * 1000)
            }
            else if(responseStatus == 403){
                console.log("You are not authenticated for this")
            }
            else{
                console.log("Could not fetch more")
                setNoMoreLogs(true)
            }
        } catch (error) {
            console.log(error)
        }
        setListLoading(false)
    }
    const createNewLog = async (title, tags)=>{
        const apiRoute = backendRoute+`/logs/adminPrivate`
        const res = await adminApiClient (apiRoute, {
            method: "POST",
            body: JSON.stringify({tags, title, content: ""})
        })
        if(res.status==202){
            const {data: newLog} = await res.json()
            setLogsList(prev=>[newLog ,...prev])
        }else{
            console.log("Failed to create new log")
        }
    }
    useEffect(()=>{
        if(logsList.length==0 && listLoading==false){
            getLogsList(1);
        }
    },[])
    return (
        <div className='dark:bg-gray-800 bg-white transition-colors duration-500 pt-2 px-4'>
            <div className='dark:text-white text-black'>
                <AddNewForm createNewLog={createNewLog}/>
            </div>
            <div className='space-y-2 w-3/5'>
                <div className='flex gap-6 items-center'>
                    <h1 className='dark:text-white text-black my-5 font-bold'>Logs</h1>
                    <button
                        className='dark:text-white text-black text-sm'
                        onClick={async ()=>{
                            // clear local storage and refetch data
                            localStorage.removeItem('adminLogsList')
                            localStorage.removeItem("listexprire")
                            await getLogsList(1)
                            setNoMoreLogs(false)
                        }}
                    >
                        /refresh local storage
                    </button>
                </div>
                {
                    logsList.map(i=>{
                        return (
                            <div key={i._id} className='dark:border-gray-700 border-b border-gray-300 py-2'>
                                <Link href={`/admin/logs/${i._id}`}>
                                    <h3 className='dark:text-white text-black'>{i.title}</h3>
                                </Link>
                                <span className='dark:text-gray-500 text-gray-700'>{i.updatedAt}</span>
                            </div>
                        )
                    })
                }
                {
                    (!noMoreLogs && !listLoading && logsList.length!=0) &&
                    <button
                        onClick={async ()=>{
                            if(btnLoading==true) return
                            const currentPage = Math.floor(logsList.length/limit) + 1
                            setBtnLoading(true)
                            await getLogsList(currentPage+1)
                            setBtnLoading(false)
                        }}
                        className={`dark:bg-gray-700 bg-gray-300 dark:text-white text-black py-2 px-4 rounded ${btnLoading ? "animate-pulse" : ""}`}
                    >
                        {btnLoading ? "..." : "More"}
                    </button>
                }
            </div>
        </div>
    )
}

export default page
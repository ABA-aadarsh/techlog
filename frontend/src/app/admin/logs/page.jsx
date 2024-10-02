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
    let currentPage = 1
    const getLogsList = async (page=1)=>{
        // initial load and load more logs TODO: store these datas in local storage along with time expiration settings
        try {
            if(logsList.length==0) setListLoading(true)
            const apiRoute = backendRoute+`/logs/adminPrivate?page=${page}&limit=${limit}`
            const res = await adminApiClient(apiRoute)
            const responseStatus = res.status
            if(responseStatus == 200) {
                const {data: list} = await res.json()
                setLogsList((prev)=>[...prev, ...list])
                currentPage+=1;
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
        if(logsList.length!=0) return
        getLogsList(1);
    },[])
    return (
        <div>
            <div className='pt-2 px-4'>
                <AddNewForm createNewLog={createNewLog}/>
            </div>
            <div>
                {
                    logsList.map(i=>{
                        return (
                            <div key={i._id}>
                                <Link href={`/admin/logs/${i._id}`}>
                                    <h3>{i.title}</h3>
                                </Link>
                                <span>{i.updatedAt}</span>
                            </div>
                        )
                    })
                }
                {
                    (!noMoreLogs && !listLoading && logsList.length!=0) &&
                    <button
                        onClick={async ()=>{
                            if(btnLoading==true) return
                            const currentPage = Math.floor(logsList.length / limit)
                            setBtnLoading(true)
                            await getLogsList(currentPage+1)
                            setBtnLoading(false)
                        }}
                    >
                        {btnLoading ? "..." : "More"}
                    </button>
                }
            </div>
        </div>
    )
}

export default page
"use client";
import React, { useEffect, useState } from 'react'
import AddNewForm from './_components/AddNewForm';
import Link from 'next/link';

const page = () => {
    const limit = 10; // no of titles per one request
    const [noMoreLogs, setNoMoreLogs] = useState(false)
    const [listLoading, setListLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [logsList, setLogsList] = useState([])
    const getLogsList = async (page=1)=>{
        // initial load and load more logs TODO: store these datas in local storage along with time expiration settings
        if(logsList.length==0) setListLoading(true)
        const apiRoute = `http://localhost:8080/logs?page=${page}&limit=${limit}&sid=1`
        const res = await fetch(apiRoute, {method: "GET"})
        const responseStatus = res.status
        if(responseStatus == 200) {
            const {data: list} = await res.json()
            setLogsList((prev)=>[...prev, ...list])
            currentPage+=1;
        }else{
            console.log("Could not fetch more")
            setNoMoreLogs(true)
        }
        setListLoading(false)
    }
    const createNewLog = async (title, tags)=>{
        const apiRoute = `http://localhost:8080`
        const res = await fetch (apiRoute, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
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
        getLogsList(1);
    },[])
    return (
        <div>
            <div>
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
                    !noMoreLogs &&
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
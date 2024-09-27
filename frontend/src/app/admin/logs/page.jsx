"use client";
import React, { useEffect, useState } from 'react'

const page = () => {
    const [logsList, setLogsList] = useState([])
    const getLogsList = async ()=>{
        const apiRoute = `http://localhost:8080/logs`
        const res = await fetch(apiRoute, {method: "GET"})
        const responseStatus = res.status
        if(responseStatus == 200) return
    }
    useEffect(()=>{
         
    },[])
    return (
        <div>page</div>
    )
}

export default page
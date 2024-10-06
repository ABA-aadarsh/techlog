"use client";
import React, { useState } from 'react'
import BtnWithDialog from './BtnWithDialog'
import { useRouter } from 'next/navigation';
import { backendRoute } from '@/app/util';

const SettingPanel = ({id,publicStatus=false}) => {
    const router = useRouter()
    const [isPublic, setIsPublic]=useState(publicStatus)
    const updatePublicStatus = async ()=>{
        const apiRoute = backendRoute+`/adminPrivate/logs/${id}/public-staus-change`
        const res = await fetch(apiRoute,{
            method:"PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({newPublicStatus: !isPublic})
        })
        if(res.status==200){
            setIsPublic(!isPublic)
        }else{
            console.log("Failed to update public status")
        }
    }
    const deleteLog = async ()=>{
        const apiRoute = backendRoute+`/adminPrivate/logs/${id}`
        const res = await fetch(apiRoute,{
            method:"DELETE"
        })
        if(res.status==200){
            console.log("Log deleted")
            router.push("/admin/logs")
            router.push()
        }else{
            console.log("Failed to delete log")
        }
    }
  return (
    <div className="mx-3">
        <ul className='flex flex-row gap-2'>
            <li>
                <span>(</span> 
                <BtnWithDialog
                    heading={`Delete log: ${id}`}
                    message={"This action is irrevertible and would cause permanent loss of the log. Are you sure about deleting this log?"}
                    onConfirmFunction={deleteLog}
                    triggerText={"Delete Log"}
                />
                <span>)</span>
            </li>
            <li>
                <span>(</span> 
                <BtnWithDialog
                    heading={"Change Public Status"}
                    message={"Changing the public status of log might cause the server to rebuild certain pages? Are you sure about it?"}
                    onConfirmFunction={updatePublicStatus}
                    triggerText={isPublic?"Make Private":"Make Public"}
                />
                <span>)</span>
            </li>
        </ul>
    </div>
  )
}

export default SettingPanel
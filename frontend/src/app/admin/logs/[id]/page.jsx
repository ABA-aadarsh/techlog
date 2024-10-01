// updation page
"use client";
import React, { useEffect, useState } from 'react'
import { useData } from './_hooks/useData';
import Editor from './_components/Editor';
import Preview from './_components/Preview';
import {  X } from 'lucide';
import { backendRoute } from '@/app/util';

const page = ({params}) => {
    const [loading,setLoading] = useState(true)
    const [error,setError]=useState(false)

    const {
        addTag, content, deleteTag, setValues, tags, title, updateContent, updateTitle
    }=useData()
    const [newTagValue,setNewTagValue]=useState("")
    const fetchData = async (id="")=>{
        try {
            const apiRoute = backendRoute+`/adminPrivate/logs/${id}`
            const res = await fetch(apiRoute,{
                method: "GET"
            })
            if(res.status==201){
                const {data} = await res.json()
                setValues(
                    {
                        _title: data.title,
                        _content: data.content,
                        _tags: data._tags
                    }
                )
            }else{
                console.log("Data not found")
                setError(true)
            }
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }
    const saveLog = async (id)=>{
        // updation
        try {
            const apiRoute =backendRoute+`/adminPrivate/logs/${id}`
            const res = await fetch(apiRoute, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({tags,title,content})
            })
            const responseStatus = res.status
            if(responseStatus == 200){
                const {id} = await res.json()
                console.log("Log added: ", id)
            }else{
                throw new error("Failed to add log")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        // setValues({
        //     _title: "Template Title",
        //     _content: "# Template Content",
        //     _tags: ["Tag1", "Tag2"]
        // })
        // setLoading(false)
        fetchData(params.id)
    },[params.id])
    if(error){
        return (
            <div>
                <p>Error in the Console</p>
            </div>
        )
    }
    if(loading){
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <nav>
                <div>
                    <button onClick={async()=>{
                        await saveLog(params.id)
                    }}>Save Log</button>
                </div>
            </nav>
            <main className='grid grid-rows-[100px_auto] grid-cols-2 grid-flow-col w-full h-dvh'>
                <section className='col-span-2'>
                    <div>
                        {/* title */}
                        <input type="text" value={title} onChange={(e)=>updateTitle(e.target.value)}/>
                    </div>
                    <div>
                        {/* tags */}
                        <div>
                            <input type="text" value={newTagValue} onChange={(e)=>setNewTagValue(e.target.value)} />
                            <button onClick={()=>addTag(newTagValue)}>Add</button>
                        </div>
                        <ul>
                            {/* {
                                tags.length>0 &&
                                tags.map(i=>(
                                    <li key={i.id}>
                                        <span>{i.tag}</span>
                                        <X onClick={()=>deleteTag(i.id)}/>
                                    </li> 
                                ))
                            } */}
                        </ul>
                    </div>
                </section>
                <section className='col-span-1'>
                    <Editor content={content} updateContent={updateContent}/>
                </section>
                <section className='col-span-1'>
                    <Preview title={title} content={content} tags={tags}/>
                </section>
            </main>
        </div>
    )
}

export default page
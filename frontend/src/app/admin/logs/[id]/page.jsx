// updation page
"use client";
import React, { useEffect, useState } from 'react'
import { useData } from './_hooks/useData';
import Editor from './_components/Editor';
import Preview from './_components/Preview';
import { backendRoute } from '@/app/util';
import apiClient from '../../adminApiClient';
import { buttonVariants } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SettingPanel from './_components/SettingPanel';

const page = ({params}) => {
    const [loading,setLoading] = useState(true)
    const [error,setError]=useState(false)
    const router = useRouter()
    const {
        addTag, content, deleteTag, setValues, tags, title, updateContent, updateTitle, public:isPublic, setPublic, togglePublic
    }=useData()
    const [newTagValue,setNewTagValue]=useState("")
    const fetchData = async (id="")=>{
        try {
            const apiRoute = backendRoute+`/logs/adminPrivate/${id}`
            const res = await apiClient(apiRoute,{
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
            const apiRoute =backendRoute+`/logs/adminPrivate/${id}`
            const res = await apiClient(apiRoute, {
                method: "PATCH",
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
        <div className="flex flex-col w-full h-dvh">
            <nav className="h-[75px] flex items-center">
                <div>
                    <button
                    className={buttonVariants({variant: "link"})}
                    onClick={()=>{
                        router.push("/admin/logs")
                    }}>(Back)</button>
                </div>
                <div className="ml-auto">
                    <button
                    className={buttonVariants({variant: "link"})}
                    onClick={async()=>{
                        await saveLog(params.id)
                    }}>Save Log</button>
                </div>
                <SettingPanel id={params.id} publicStatus={isPublic}/>
            </nav>
            <main className='flex-grow grid grid-rows-[100px_auto] grid-cols-2 grid-flow-col'>
                <section className='col-span-2'>
                    <div className="flex items-center justify-center">
                        {/* title */}
                        <input type="text" value={title} onChange={(e)=>updateTitle(e.target.value)}
                            placeholder="Title"
                            className='max-w-[500px] w-4/5 p-1 text-sm rounded-sm text-black bg-white border-2 border-zinc-400'
                        />
                    </div>
                    <div className="px-2 flex items-center justify-between">
                        {/* tags */}
                        <div className="text-sm flex items-center gap-2">
                            <input type="text" value={newTagValue} onChange={(e)=>setNewTagValue(e.target.value)} 
                                className='p-1 w-[100px] text-sm rounded-sm text-black bg-white border-2 border-zinc-400'
                            />
                            <button onClick={()=>addTag(newTagValue)}>Add</button>
                        </div>
                        {tags.length==0 && <p>No Tags</p>}
                        {
                            tags.length>0 &&
                            (
                                <div className="text-sm">
                                    <ul className='mx-2 inline-flex items-center gap-2'>
                                        {
                                            tags.map((tagObject)=>{
                                                return (
                                                    <li key={tagObject.id} className={buttonVariants({variant:"link"}) + " cursor-pointer"} onClick={()=>deleteTag(tagObject.id)}>
                                                        {tagObject.tag}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <p className="inline-block"> | Tags</p>
                                </div>
                            )
                        }
                        
                    </div>
                </section>
                <section className='col-span-1 overflow-y-auto px-1'>

                    <Editor content={content} updateContent={updateContent}/>
                </section>
                <section className='col-span-1 overflow-y-auto px-1'>
                    <Preview title={title} content={content} tags={tags}/>
                </section>
            </main>
        </div>    )
}

export default page
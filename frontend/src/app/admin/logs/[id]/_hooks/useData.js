"use client";
import { v4 as uuidv4 } from "uuid";
const { useState } = require("react")

export const useData = ()=>{
    const [title,setTitle] = useState("");
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([])

    const setValues = ({_title, _content, _tags}) => {
        if(typeof(_title)!="string" || typeof(_content)!="string" || !Array.isArray(_tags)){
            console.log("Invalid data types")
            return false
        }
        setTitle(_title)
        setContent(_content)
        setTags(()=>{
            return _tags.map(i=>(
                {
                    tag:i,
                    id: uuidv4()
                }
            ))
        })
    }
    const updateTitle = (_title)=>{
        setTitle(_title)
    }
    const updateContent = (_content)=>{
        setContent(_content)
    }
    const deleteTag = (id)=>{
        setTags((prev)=>prev.filter(i=>i.id!=id))
    }
    const addTag = (newTag)=>{
        setTags(prev=>[...prev, {id:uuidv4(), tag:newTag }])
    }
    return {
        setValues,
        updateContent,
        updateTitle,
        deleteTag,
        addTag,
        title,
        content,
        tags
    }
}
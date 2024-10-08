"use client";
import { v4 as uuidv4 } from "uuid";
const { useState } = require("react")

export const useData = ()=>{
    const [title,setTitle] = useState("");
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([])
    const [isPublic, setIsPublic] = useState(false)

    const setValues = ({_title, _content, _tags, _public}) => {
        if(typeof(_title)=="string" || _title=="") setTitle(_title);
        if(typeof(_content)=="string" || _content=="") setContent(_content);
        if(Array.isArray(_tags) && _tags.length>0)
        setTags(()=>{
            return _tags.map(i=>(
                {
                    tag:i,
                    id: uuidv4()
                }
            ))
        })
        if(typeof(_public)=="boolean") setIsPublic(_public)
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
    const togglePublic = ()=>{
        setIsPublic(prev=>!prev)
    }
    return {
        setValues,
        updateContent,
        updateTitle,
        deleteTag,
        addTag,
        title,
        content,
        tags,
        isPublic,
        togglePublic,
        setIsPublic
    }
}
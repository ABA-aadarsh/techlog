"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { XCircle } from 'lucide-react'
const AddNewForm = ({createNewLog=async(title, tags)=>{}}) => {
  const [title, setTitle]=useState("")
  const [tags,setTags]=useState([])
  const addNewTag = (tagName)=>{
    setTags(prev=>[...prev, {id: uuidv4(), tag: tagName}])
  }
  const deleteTag = (id) =>{
    setTags(prev=>prev.filter(i=>i.id!=id))
  }
  const [dialogOpen, setDialogOpen] = useState(false)
  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger onClick={setDialogOpen(true)}>
        New
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-light">
            Starting a new log? Hurray!!!
          </DialogTitle>
          <div>
            <div>
              <label htmlFor="title">Title</label>
              <input id="title" type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="tags">Tags</label>
              <div>
                <input id="tags" type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
                <button className='' onClick={addNewTag}>Add</button>
              </div>
              <div>
                <ul>
                  {
                    tags.map(i=>(
                      <li key={i.id}>
                        <span>{i.tag}</span>
                        <XCircle onClick={()=>deleteTag(i.id)}/>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            
          </div>
        </DialogHeader>
        <DialogFooter>
          <div>
            <button 
              onClick={async ()=>{await createNewLog(title, tags);setDialogOpen(false)}}
            >Proceed</button>

            <button onClick={()=>{
              setTitle("")
              setTags([])
              setDialogOpen(false)
            }}>
              Cancel
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewForm
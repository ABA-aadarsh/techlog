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
import { XCircle, XIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

const AddNewForm = ({createNewLog}) => {
  const [title, setTitle]=useState("")
  const [tags,setTags]=useState([])
  const [newTag, setNewTag]=useState("")
  const addNewTag = ()=>{
    if(newTag=="") return
    setTags(prev=>[...prev, {id: uuidv4(), tag: newTag}])
  }
  const deleteTag = (id) =>{
    setTags(prev=>prev.filter(i=>i.id!=id))
  }
  const [dialogOpen, setDialogOpen] = useState(false)
  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      className="dark:bg-gray-800 bg-white rounded-lg shadow-lg p-4"
    >
      <DialogTrigger className={buttonVariants({variant:"default"})}>
        New
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle className="font-light text-lg">A New Log ?</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="block w-full px-3 py-2 text-base text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm appearance-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="tags"
              type="text"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              className="block w-full px-3 py-2 text-base text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm appearance-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
            />
            <button
              onClick={()=>{
                addNewTag()
                setNewTag("")
              }}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-400 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 flex gap-4">
            {tags.map(i => (
              <li key={i.id} className="flex items-center justify-between bg-black text-white rounded-md py-2 px-4 relative">
                <span className="text-sm">{i.tag}</span>
                <XIcon size={13}
                  onClick={() => deleteTag(i.id)}
                  className="hover:text-blue-400 cursor-pointer absolute right-0.5 top-0.5"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={async () => {
              if(title=="" || tags.length==0) return
              await createNewLog(title, tags);
              setDialogOpen(false);
            }}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            Proceed
          </button>

          <button
            onClick={() => {
              setTitle("");
              setTags([]);
              setDialogOpen(false);
            }}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-400 dark:focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewForm
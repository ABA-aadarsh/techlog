"use client";
import React from 'react'
import {Copy, Mail} from "lucide-react"
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
  import {Button} from "@/components/ui/button"
  import {Input} from "@/components/ui/input"

const GmailDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='p-2 rounded-sm border px-3'>
          <Mail size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gmail</DialogTitle>
          <DialogDescription>
            No Spam
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              defaultValue="aadarshbandhuaryal@gmail.com"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3"
            onClick={() => {
              navigator.clipboard.writeText("aadarshbandhuaryal@gmail.com")
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4"  />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default GmailDialog
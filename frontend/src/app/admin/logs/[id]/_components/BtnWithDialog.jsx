import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
const BtnWithDialog = ({onConfirmFunction, message, heading, triggerText="Confirm Action"}) => {
  const [open, setopen] = useState(false)
  return (
    <>
    <AlertDialog open={open} onOpenChange={setopen}>
    <AlertDialogTrigger>{triggerText}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{heading}</AlertDialogTitle>
        <AlertDialogDescription>
          {message}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <button
          onClick={async ()=>{
            await onConfirmFunction()
            setopen(false)
          }}
        >
          Confirm
        </button>
      </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

export default BtnWithDialog
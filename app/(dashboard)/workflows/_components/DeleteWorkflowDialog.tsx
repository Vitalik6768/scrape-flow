"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'
import React, { useState } from 'react'


interface Props{
    open:boolean;
    setOpen:(open:boolean)=> void;
    workflowname:string;
}

function DeleteWorkflowDialog({open, setOpen, workflowname}:Props) {

    const [confirmText, setConfirmText] = useState("");

    // const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you Absulotly Sure?</AlertDialogTitle>
                <AlertDialogDescription> if you delete this workflow you will not be able to recovery 
                    <div className='flex flex-col py-4 gap-2'>
                        <p>if you are sure, enter <b>{workflowname}</b> to confirm:</p>
                        <Input value={confirmText} onChange={e => setConfirmText(e.target.value)}/>
                    </div>

                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-destructive text-destructive-foreground hover:bg-destructive/90' disabled={confirmText !== workflowname}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  
  )
}

export default DeleteWorkflowDialog

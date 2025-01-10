"use client"

import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'
import { useMutation } from '@tanstack/react-query';
import { Workflow } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';


interface Props{
    open:boolean;
    setOpen:(open:boolean)=> void;
    workflowname:string;
    workflowId:string
}

function DeleteWorkflowDialog({open, setOpen, workflowname, workflowId}:Props) {

    const [confirmText, setConfirmText] = useState("");

    const deleteMutation = useMutation({
        mutationFn:DeleteWorkflow,
        onSuccess:() => {
            toast.success("Workflow Deleted Sucsesfuly", {id:workflowId})
            setConfirmText("");
        },
        onError:() => {
            toast.error("sumthing went wrong", {id:workflowId})
        }
    })

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
                <AlertDialogCancel onClick={() => setConfirmText("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-destructive text-destructive-foreground hover:bg-destructive/90' disabled={confirmText !== workflowname || deleteMutation.isPending} onClick={(e => {
                    toast.loading("Deleting Workflow...", {id:workflowId});
                    deleteMutation.mutate(workflowId)
                })}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  
  )
}

export default DeleteWorkflowDialog

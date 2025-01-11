import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Editor from '../../_commponents/Editor'

async function page({ params }: { params: { workflowId: string } }) {

    const {userId} = await auth()
    const workflowId = params.workflowId

    if(!userId){
        return<div>Unothanticated</div>
    }

    const workflow = await prisma.workflow.findUnique({
        where:{
            id:workflowId,
            userId
        }
    })

    if(!workflow){
        return <div>Workflow Not Found</div>
    }

    return (
        <Editor workflow={workflow}/>


    
    )
}

export default page

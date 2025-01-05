"use server"

import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { z } from "zod";
import { auth } from '@clerk/nextjs/server'
import { prisma } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { redirect } from "next/navigation";


export async function CreateWorkflow(form:createWorkflowSchemaType){

    const {success, data} = createWorkflowSchema.safeParse(form)

    if(!success){
        throw new Error('problem woth form')
    }

    const { userId } = await auth();

    if(!userId){
        throw new Error('not authorized')
    }

    const result = await prisma.workflow.create({
        data:{
            userId,
            status:WorkflowStatus.DRAFT,
            definition:"to do",
            ...data,
        }
    });

    if(!result){
        throw new Error('failed to create Workflow')
    }

    redirect(`/workflow/editor/${result.id}`)


}
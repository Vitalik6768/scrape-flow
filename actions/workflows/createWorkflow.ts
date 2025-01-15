"use server"

import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { z } from "zod";
import { auth } from '@clerk/nextjs/server'
import { prisma } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { redirect } from "next/navigation";
import { AppNode } from "@/types/appNode";
import { Edge } from "@xyflow/react";
import { CreateFlowNode } from "@/lib/workflow/CreateFlowNode";
import { TaskType } from "@/types/task";


export async function CreateWorkflow(form:createWorkflowSchemaType){

    const {success, data} = createWorkflowSchema.safeParse(form)

    if(!success){
        throw new Error('problem woth form')
    }

    const { userId } = await auth();

    if(!userId){
        throw new Error('not authorized')
    }

    const initialFlow : {nodes: AppNode[], edges: Edge[]} = {
        nodes:[],
        edges:[]
    }

    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

    const result = await prisma.workflow.create({
        data:{
            userId,
            status:WorkflowStatus.DRAFT,
            definition:JSON.stringify(initialFlow),
            ...data,
        }
    });

    if(!result){
        throw new Error('failed to create Workflow')
    }

    redirect(`/workflow/editor/${result.id}`)


}
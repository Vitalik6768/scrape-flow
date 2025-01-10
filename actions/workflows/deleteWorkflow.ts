"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function DeleteWorkflow(id:string) {
    const {userId} =  await auth()

    if(!userId){
        return new Error('user not authanticated')
    }

    await prisma.workflow.delete({
        where:{
            id,
            userId
        },
    });

    revalidatePath("/workflows")

}
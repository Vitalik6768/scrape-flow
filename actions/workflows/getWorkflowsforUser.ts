"use server";

import { prisma } from "@/lib/prisma";
import { auth } from '@clerk/nextjs/server'

export async function getWorkflowsforUser() {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("No authentication found");
    }


    return prisma.workflow.findMany({
        where: {
            userId, // userId is already a string, no need for type assertion
        },
        orderBy:{
            createdAt:"asc"
        }
    });
}
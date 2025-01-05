import { getWorkflowsforUser } from '@/actions/workflows/getWorkflowsforUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, InboxIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import CreateWorkflowDialog from './_components/CreateWorkflowDialog'

function WorkflowsPage() {
    return (
        <div className='flex-1 flex flex-col h-full'>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-bold'>workflows</h1>
                    <p className='text-muted-foreground'>
                        Manage Your Workflows
                    </p>
                </div>
                <CreateWorkflowDialog/>

            </div>

            <div className='h-full py-6'>
                <Suspense fallback={<UserWorkFlowsSkeleton></UserWorkFlowsSkeleton>}>
                    <UserWorkflows />
                </Suspense>

            </div>
        </div>
    )
}

function UserWorkFlowsSkeleton() {
    return (
        <div className='space-y-2'>
            {
                [1, 2, 3].map(i => (<Skeleton key={i} className='h-32 w-full' />))
            }
        </div>
    )
}


async function UserWorkflows() {

    const workflows = await getWorkflowsforUser();
    // console.log(workflows);
    if (!workflows) {
        return (
            <Alert variant={"destructive"}>
                <AlertCircle className='w-4 h-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>sumthing is wrong try again later</AlertDescription>
            </Alert>
        )
    }

    if (workflows.length === 0) {
        return (
            <div className='flex flex-col gap-4 h-full items-center'>
                <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
                    <InboxIcon className='strong-primary' size={40} />
                </div>
                <div className='flex flex-col gap-1 text-center'>
                    <p className='font bold'>no workflow created</p>
                    <p className='text-sm text-muted-foreground'>
                        click the button bellow to create your first workflow
                    </p>

                </div>
                <CreateWorkflowDialog trigerText='Create your first workflow'/>
            </div>
        )

    }



    return <div>sd</div>
}

export default WorkflowsPage

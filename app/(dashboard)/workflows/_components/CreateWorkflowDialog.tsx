"use client"

import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflow';
import { Layers2, Loader2 } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkflow } from '@/actions/workflows/createWorkflow';
import { toast } from 'sonner';

function CreateWorkflowDialog({ trigerText }: { trigerText?: string }) {

    const [open, setOpen] = useState(false);
    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {},

    });

    const { mutate, isPending } = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: () => {
            toast.success("Work Flow Created", { id: "Create work-flow" })

        },
        onError: () => {
            toast.error(" faild to create work flow ", { id: "Create work-flow" })
        }
    });


    const onSubmit = useCallback((
        values: createWorkflowSchemaType
    ) => {
        toast.loading("Creating Workflow...", { id: "Create work-flow" });
        mutate(values)

    }, [mutate])


    return (
        <Dialog open={open} onOpenChange={open =>{
            form.reset();
            setOpen(open);
        }}>
            <DialogTrigger asChild>
                <Button>{trigerText ?? "create workflow"}</Button>

            </DialogTrigger>

            <DialogContent className='px-0'>

                <CustomDialogHeader icon={Layers2} title="create workflow" subtitle="start building your workflow" />

                <div className='p-6'>
                    <Form {...form}>
                        <form className='space-y-2 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex gap-1 items-center'>Name
                                            <p className='text-xs text-primary'>(required)</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormDescription>choose your descriptive name.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex gap-1 items-center'>Description
                                            <p className='text-xs text-muted-foreground'></p>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea className='resize-none' {...field} />
                                        </FormControl>
                                        <FormDescription>choose your project description.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type='submit' className='w-full' disabled={isPending}>
                                {!isPending && "procced"}
                                {isPending && <Loader2 className='animate-spin'/>}

                            </Button>

                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default CreateWorkflowDialog

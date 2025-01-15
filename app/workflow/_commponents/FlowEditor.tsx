"use cient"


import { Workflow } from '@prisma/client'
import "@xyflow/react/dist/style.css"
import {
    Background,
    BackgroundVariant,
    Controls,
    type Edge,
    type Node,
    type NodeOrigin,
    ReactFlow,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "@xyflow/react";

import React, { useCallback, useEffect, useState } from 'react'
import { CreateFlowNode } from '@/lib/workflow/CreateFlowNode';
import { TaskType } from '@/types/task';
import NodeComponent from './nodes/NodeComponent';
import { number } from 'zod';





const nodeTypes ={
    FlowScrapeNode:NodeComponent
}

const snapGrid : [number, number] = [50, 50]
const fitViewOptions = {padding: 1}

function FlowEditor({ workflow }: { workflow: Workflow }) {

    const initialNodes: Node[] = [
        { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
      ];
    const initialEdges: Edge[] = [];

    const [nodes, setNodes] = useState<any>([]);
    const [edges, setEdges] = useState([]);
    const {setViewport, screenToFlowPosition} = useReactFlow()


    const onNodesChange = useCallback((changes:any) => {
        setNodes((prevNodes: Node[]) => applyNodeChanges(changes, prevNodes));
      }, []);
    
      const onEdgesChange = useCallback((changes:any) => {
        setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
      }, []);


      const onDragOver = useCallback((event:React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"
      },[])
      
      const onDrop = useCallback((event:React.DragEvent) => {
        event.preventDefault();
        const taskType = event.dataTransfer.getData("application/reactflow")
        if(!taskType){
            return
        }
        const position = screenToFlowPosition(
            {
                x: event.clientX,
                y: event.clientY
            }
        )

        const newNode = CreateFlowNode(taskType as TaskType, position)
        setNodes((nds:Node[]) => nds.concat(newNode))
      },[])



      useEffect(()=>{
        try{
            const flow = JSON.parse(workflow.definition)
            if(!flow){
                return
            }
            setNodes(flow.nodes || [])
            setEdges(flow.edges || [])
            if(!flow.viewport){
                return
            }

            const {x =0, y =0, zoom =1} = flow.viewport
            setViewport({x, y, zoom})
        }catch(error){
            console.log(error)
        }
    
      },[workflow.definition, setNodes, setEdges, setViewport])



    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                snapToGrid
                snapGrid={snapGrid}
                fitViewOptions={fitViewOptions}
                onDragOver={onDragOver}
                onDrop={onDrop}

                fitView
            >
                <Background />

                <Controls position='top-left' fitViewOptions={fitViewOptions} />
            </ReactFlow>

        </main>

    )
}

export default FlowEditor

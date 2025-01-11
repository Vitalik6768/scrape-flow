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

import React, { useCallback, useState } from 'react'
import { CreateFlowNode } from '@/lib/workflow/CreateFlowNode';
import { TaskType } from '@/types/task';



function FlowEditor({ workflow }: { workflow: Workflow }) {

    const initialNodes: Node[] = [
        { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
      ];
    const initialEdges: Edge[] = [];



    const [nodes, setNodes] = useState<any>([CreateFlowNode(TaskType.LUNCH_BROWSER)]);
    const [edges, setEdges] = useState([]);


    const onNodesChange = useCallback((changes:any) => {
        setNodes((prevNodes: Node[]) => applyNodeChanges(changes, prevNodes));
      }, []);
    
      const onEdgesChange = useCallback((changes:any) => {
        setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
      }, []);



    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
            >
                <Background />

                <Controls position='top-left' />
            </ReactFlow>


        </main>

    )
}

export default FlowEditor

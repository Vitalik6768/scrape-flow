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

    const [nodes, setNodes] = useState<any>([CreateFlowNode(TaskType.LAUNCH_BROWSER)]);
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
                nodeTypes={nodeTypes}
                snapToGrid
                snapGrid={snapGrid}
                fitViewOptions={fitViewOptions}
                fitView
            >
                <Background />

                <Controls position='top-left' fitViewOptions={fitViewOptions} />
            </ReactFlow>

        </main>

    )
}

export default FlowEditor

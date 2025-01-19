"use cient"


import { Workflow } from '@prisma/client'
import "@xyflow/react/dist/style.css"
import {
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    type Edge,
    type Node,
    type NodeOrigin,
    ReactFlow,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    getOutgoers,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "@xyflow/react";

import React, { useCallback, useEffect, useState } from 'react'
import { CreateFlowNode } from '@/lib/workflow/CreateFlowNode';
import { TaskParamType, TaskType } from '@/types/task';
import NodeComponent from './nodes/NodeComponent';
import { number } from 'zod';
import DeletableEdge from './edges/DeletableEdge';
import { TaskRegistry } from '@/lib/workflow/task/registry';



const nodeTypes = {
    FlowScrapeNode: NodeComponent
}

const edgeTypes = {
    default: DeletableEdge
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 1 }

function FlowEditor({ workflow }: { workflow: Workflow }) {

    const initialNodes: Node[] = [
        { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
    ];
    const initialEdges: Edge[] = [];

    const [nodes, setNodes] = useState<any>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow()


    const onNodesChange = useCallback((changes: any) => {
        setNodes((prevNodes: Node[]) => applyNodeChanges(changes, prevNodes));
    }, []);

    const onEdgesChange = useCallback((changes: any) => {
        setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
    }, []);


    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"
    }, [])

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        const taskType = event.dataTransfer.getData("application/reactflow")
        if (!taskType) {
            return
        }
        const position = screenToFlowPosition(
            {
                x: event.clientX,
                y: event.clientY
            }
        )

        const newNode = CreateFlowNode(taskType as TaskType, position)
        setNodes((nds: Node[]) => nds.concat(newNode))
    }, [screenToFlowPosition, setNodes])

    const onConnect = useCallback((connection: Connection) => {
        setEdges(eds => addEdge({ ...connection, animated: true }, eds))
        if (!connection.targetHandle) {
            return
        }
        const node = nodes.find((node: Node) => node.id === connection.target)
        if (!node) {
            return
        }

        const nodeInputs = node.data.inputs;
        updateNodeData(node.id, {
            ...nodeInputs,
            [connection.targetHandle]: ""

            //to do clear state


        })

    }, [setEdges, updateNodeData, nodes])



    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition)
            if (!flow) {
                return
            }
            setNodes(flow.nodes || [])
            setEdges(flow.edges || [])
            if (!flow.viewport) {
                return
            }

            const { x = 0, y = 0, zoom = 1 } = flow.viewport
            setViewport({ x, y, zoom })
        } catch (error) {
            console.log(error)
        }

    }, [workflow.definition, setNodes, setEdges, setViewport])

    console.log('Nodes', nodes)

    const isValidConnection = useCallback((connection: Connection | Edge) => {

        // no self connection allowed
        if (connection.source === connection.target) {
            return false
        }

        //same task param connection not allowed
        const source = nodes.find((node: { id: string; }) => node.id === connection.source)
        const target = nodes.find((node: { id: string; }) => node.id === connection.target)

        if (!source || !target) {
            return false
        }

        const sourceTask = TaskRegistry[source.data.type as keyof typeof TaskRegistry];
        const targetTask = TaskRegistry[target.data.type as keyof typeof TaskRegistry];

        const output = sourceTask.outputs.find((output: any) => output.name === connection.sourceHandle);
        const input = targetTask.inputs.find((input: any) => input.name === connection.targetHandle);

        if (input?.type !== output?.type) {
            return false
        }

        const hasCycle = (node: Node, visited = new Set()) => {
            if (visited.has(node.id)) {
                return false
            }
            visited.add(node.id)


            for (const outgoer of getOutgoers(node, nodes, edges)) {
                if (outgoer.id === connection.source) return true;
                if (hasCycle(outgoer, visited)) return true;
            }
        }

        const detactedCycle = hasCycle(target)
        return !detactedCycle




        // return true
    }, [nodes, edges])

    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                snapToGrid
                snapGrid={snapGrid}
                fitViewOptions={fitViewOptions}
                onDragOver={onDragOver}
                onDrop={onDrop}
                isValidConnection={isValidConnection}
                onConnect={onConnect}

                fitView
            >
                <Background />

                <Controls position='top-left' fitViewOptions={fitViewOptions} />
            </ReactFlow>

        </main>

    )
}

export default FlowEditor

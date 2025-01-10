"use client"

// import { TooltipProvider } from '@radix-ui/react-tooltip';
import React, { ReactNode } from 'react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';


interface Props{
    children : ReactNode;
    content : ReactNode;
    side?:"top" | "bottom" | "left" | "right"
}


function ToolTipWrapper(props:Props) {
  return (
    <TooltipProvider delayDuration={0}>
        <Tooltip>
            <TooltipTrigger asChild>{props.children}</TooltipTrigger>
            <TooltipContent side={props.side}>{props.content}</TooltipContent>
                
        </Tooltip>

    </TooltipProvider>

  )
}

export default ToolTipWrapper

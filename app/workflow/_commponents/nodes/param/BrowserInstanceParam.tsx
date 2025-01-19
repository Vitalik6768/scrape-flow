"use client"

import { ParamProps, ParamPropsBrowser } from '@/types/appNode'
import React from 'react'

export default function BrowserInstanceParam( { param }: ParamPropsBrowser ) {
  return (
    <p className='text-xs'>{param.name}</p>

  )
}

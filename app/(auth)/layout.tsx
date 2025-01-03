import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import Logo from '@/components/Logo'
import { AppProviders } from '@/components/providers/AppProviders'
import DesktopDidebar from '@/components/Sidebar'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=' flex flex-col items-center justify-center h-screen gap-4'>
      <Logo/>
      {children}

    </div>
  )
}

export default layout

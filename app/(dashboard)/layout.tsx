import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import { AppProviders } from '@/components/providers/AppProviders'
import DesktopDidebar from '@/components/Sidebar'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'
import { SignedIn, SignIn, UserButton } from '@clerk/nextjs'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=' flex h-screen'>
      <DesktopDidebar />
      <div className='flex flex-col flex-1 min-h-screen'>
        <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>
          <BreadCrumbHeader />
          <div className="gap-4 flex items-center">
            <ModeToggle />

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        <Separator />
        <div className='overflow-auto'>
          <div className='flex-1 container py-4 text-accent-foreground'>

            {children}

          </div>
        </div>
      </div>
    </div>
  )
}

export default layout

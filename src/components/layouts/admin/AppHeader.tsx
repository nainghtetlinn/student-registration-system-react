import { ModeToggle } from '@/components/mode-toggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { Link, useLocation } from '@tanstack/react-router'
import React from 'react'

export const AppHeader = () => {
  const { pathname } = useLocation()
  const paths = pathname.split('/').filter((path) => path)

  return (
    <header className='flex items-center border-b p-2'>
      <div className='flex flex-1 items-center'>
        <SidebarTrigger />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-6'
        />
        <Breadcrumb className='pl-4 capitalize'>
          <BreadcrumbList>
            {paths.map((path, i) => {
              return (
                <React.Fragment key={i}>
                  {i + 1 == paths.length ? (
                    <BreadcrumbItem>
                      <BreadcrumbPage>{path}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <>
                      <BreadcrumbItem className='hidden md:block'>
                        <BreadcrumbLink asChild>
                          <Link to={'/' + paths.slice(0, i + 1).join('/')}>
                            {path}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className='hidden md:block' />
                    </>
                  )}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ModeToggle />
    </header>
  )
}

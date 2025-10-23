import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { File } from 'lucide-react'

import type { ReactNode } from 'react'

export const ErrorComponent = ({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) => {
  return (
    <div className='flex h-[80vh] items-center justify-center'>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <File />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
        <EmptyContent>{children}</EmptyContent>
      </Empty>
    </div>
  )
}

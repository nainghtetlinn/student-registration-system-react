import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  BadgeCheckIcon,
  BadgeXIcon,
  Calendar,
  Edit,
  File,
  Hash,
} from 'lucide-react'

import type { TForm } from '@/types/form'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'

export const FormDetails = ({ data: form }: { data: TForm }) => {
  return (
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <CardTitle className='flex items-center gap-3'>
              <File className='h-5 w-5' />
              <span>Form #{form.number}</span>
              {form.open ? (
                <Badge
                  variant='secondary'
                  className='bg-blue-500 text-white dark:bg-blue-600'
                >
                  <BadgeCheckIcon />
                  Open
                </Badge>
              ) : (
                <Badge variant='secondary'>
                  <BadgeXIcon />
                  Closed
                </Badge>
              )}
            </CardTitle>
            <CardDescription className='mt-1 ml-8'>
              Academic year • {form.academicYear}
            </CardDescription>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={'icon'}
                variant={'secondary'}
                asChild
              >
                <Link
                  to='/admin/forms/$id/update'
                  params={{ id: form.id }}
                >
                  <Edit />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit this form</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='flex items-center gap-2'>
          <Hash className='h-4 w-4' />
          <div>
            <div className='text-muted-foreground text-xs'>Code</div>
            <div className='font-medium'>{form.code}</div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Hash className='h-4 w-4' />
          <div>
            <div className='text-muted-foreground text-xs'>Full ID</div>
            <div className='font-medium'>{form.id}</div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Hash className='h-4 w-4' />
          <div>
            <div className='text-muted-foreground text-xs'>Academic Year</div>
            <div className='font-medium'>{form.academicYear}</div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Hash className='h-4 w-4' />
          <div>
            <div className='text-muted-foreground text-xs'>Status</div>
            <div className='font-medium'>
              {form.open
                ? 'Accepting submissions'
                : 'Not accepting submissions'}
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Calendar className='h-4 w-4' />
          <div>
            <div className='text-muted-foreground text-xs'>Created</div>
            <div className='font-medium'>
              {format(form.createdAt, 'MMM dd, yyyy, h:mm a')}
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Calendar className='h-4 w-4' />
          <div>
            <div className='text-muted-foreground text-xs'>Updated</div>
            <div className='font-medium'>
              {form.updatedAt
                ? format(form.updatedAt, 'MMM dd, yyyy, h:mm a')
                : '-'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

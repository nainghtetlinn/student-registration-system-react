import { DropPhoto, type TDropPhoto } from '@/components/drop-photo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Upload,
} from 'lucide-react'
import { InitiateClosureBtn } from './ui/initiate-closure-btn'

import { useUploadStamp } from '@/api/form/upload-stamp'
import { Spinner } from '@/components/ui/spinner'
import type { TForm } from '@/types/form'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { useRef, useState } from 'react'

export const FormDetails = ({ data: form }: { data: TForm }) => {
  const stampRef = useRef<TDropPhoto>(null)
  const [uploadable, setUploadable] = useState(false)

  const { mutate, isPending } = useUploadStamp(form.id)

  const handleDrop = (file: File) => {
    if (file) setUploadable(true)
  }

  const handleCancel = () => {
    stampRef.current?.remove()
    setUploadable(false)
  }

  const handleUpload = () => {
    const file = stampRef.current?.get()
    if (!file) return
    mutate(file)
  }

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
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
        </div>
        {!form.stampUrl ? (
          <div className='relative mt-4'>
            <DropPhoto
              photoName='stamp'
              ref={stampRef}
              onDrop={handleDrop}
            />
            <div className='mt-2 flex justify-end gap-2'>
              <Button
                variant={'secondary'}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                disabled={isPending || !uploadable}
                onClick={handleUpload}
              >
                Upload {isPending ? <Spinner /> : <Upload />}
              </Button>
            </div>
          </div>
        ) : (
          <div>Uploaded stamp here</div>
        )}
      </CardContent>
      <CardFooter>
        <InitiateClosureBtn id={form.id} />
      </CardFooter>
    </Card>
  )
}

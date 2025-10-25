import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { ImageOff } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useGetFile } from '@/features/form/api/get-file'

export const Stamp = ({
  url,
  id,
  className,
  ...props
}: { url: string | null; id: string } & React.ComponentProps<'div'>) => {
  const { fileUrl, loading } = useGetFile(url, id)

  return (
    <div
      className={cn('h-[100px] w-[100px]', className)}
      {...props}
    >
      {loading ? (
        <Skeleton className='h-full w-full' />
      ) : fileUrl ? (
        <Avatar className='h-full w-full'>
          <AvatarImage
            src={fileUrl}
            alt='stamp photo'
            className='object-cover'
          />
          <AvatarFallback>??</AvatarFallback>
        </Avatar>
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <ImageOff />
        </div>
      )}
    </div>
  )
}

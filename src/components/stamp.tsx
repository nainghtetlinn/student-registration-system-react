import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'
import { useGetFile } from '@/api/form/get-file'

export const Stamp = ({
  url,
  id,
  className,
  ...props
}: { url: string; id: string } & React.ComponentProps<'div'>) => {
  const { fileUrl, loading } = useGetFile(url, id)

  return (
    <div
      className={cn('h-[100px] w-[100px]', className)}
      {...props}
    >
      {loading ? (
        <Skeleton className='h-full w-full rounded-full' />
      ) : (
        <Avatar className='h-full w-full'>
          <AvatarImage
            src={fileUrl ?? '/shadcn.jpg'}
            alt='stamp photo'
            className='object-cover'
          />
          <AvatarFallback>??</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

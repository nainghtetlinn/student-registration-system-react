import { Skeleton } from '@/components/ui/skeleton'
import { ImageOff } from 'lucide-react'

export const Image = ({
  url,
  alt,
  loading,
}: {
  url: string | null
  alt: string
  loading: boolean
}) => {
  return (
    <div className='h-[150px] w-[150px] overflow-hidden rounded border'>
      {loading ? (
        <Skeleton className='h-full w-full' />
      ) : url ? (
        <img
          src={url}
          alt={alt}
          className='h-full w-full object-contain'
        />
      ) : (
        <div className='text-muted-foreground flex h-full w-full items-center justify-center'>
          <ImageOff className='h-8 w-8' />
        </div>
      )}
    </div>
  )
}

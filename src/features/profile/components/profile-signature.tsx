import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { DeleteSignature } from './delete-signature'
import { UploadSignature } from './upload-signature'

import { useGetFile } from '../api/get-file'
import { ImageOff } from 'lucide-react'

export const ProfileSignature = ({ url }: { url: string | null }) => {
  const { fileUrl, loading } = useGetFile(url, 'Signature')

  if (loading)
    return <Skeleton className='mx-auto h-[150px] w-[150px] rounded-lg' />

  if (!fileUrl)
    return (
      <div className='relative mx-auto flex h-[150px] w-[150px] items-center justify-center rounded-lg border'>
        <ImageOff />
        <div className='absolute right-0 bottom-0'>
          {import.meta.env.DEV ? (
            url ? (
              <DeleteSignature />
            ) : (
              <UploadSignature />
            )
          ) : (
            !url && <UploadSignature />
          )}
        </div>
      </div>
    )

  return (
    <div className='relative'>
      <Avatar className='mx-auto h-[150px] w-[150px] rounded-lg border'>
        <AvatarImage
          src={fileUrl}
          alt='signature'
          className='object-contain'
        />
        <AvatarFallback>??</AvatarFallback>
      </Avatar>

      <div className='absolute right-0 bottom-0'>
        {import.meta.env.DEV ? (
          url ? (
            <DeleteSignature />
          ) : (
            <UploadSignature />
          )
        ) : (
          !url && <UploadSignature />
        )}
      </div>
    </div>
  )
}

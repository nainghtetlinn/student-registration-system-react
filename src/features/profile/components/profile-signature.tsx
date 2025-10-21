import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { DeleteSignature } from './delete-signature'
import { UploadSignature } from './upload-signature'

import { useGetFile } from '../api/get-file'

export const ProfileSignature = ({ url }: { url: string | null }) => {
  const { fileUrl, loading } = useGetFile(url, 'Signature')

  if (loading)
    return <Skeleton className='mx-auto h-[100px] w-[100px] rounded-full' />

  return (
    <div className='relative'>
      <Avatar className='mx-auto h-[100px] w-[100px]'>
        <AvatarImage
          src={fileUrl ?? '/shadcn.jpg'}
          alt='signature'
          className='object-cover'
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

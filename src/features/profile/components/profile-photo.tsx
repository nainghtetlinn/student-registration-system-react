import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { DeleteProfilePhoto } from './delete-profile-photo'
import { UploadProfilePhoto } from './upload-profile-photo'

import { useGetFile } from '@/api/profile/get-file'

export const ProfilePhoto = ({ url }: { url: string | null }) => {
  const { fileUrl, loading } = useGetFile(url, 'Profile Photo')

  if (loading)
    return <Skeleton className='mx-auto h-[100px] w-[100px] rounded-full' />

  return (
    <div className='relative'>
      <Avatar className='mx-auto h-[100px] w-[100px]'>
        <AvatarImage
          src={fileUrl ?? '/shadcn.jpg'}
          alt='profile photo'
          className='object-cover'
        />
        <AvatarFallback>??</AvatarFallback>
      </Avatar>

      <div className='absolute right-0 bottom-0'>
        {url ? <DeleteProfilePhoto /> : <UploadProfilePhoto />}
      </div>
    </div>
  )
}

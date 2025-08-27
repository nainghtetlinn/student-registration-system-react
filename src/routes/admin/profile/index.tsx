import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DeleteProfilePhoto } from '@/features/profile/components/delete-profile-photo'
import { UploadProfilePhoto } from '@/features/profile/components/upload-profile-photo'
import { Edit2 } from 'lucide-react'

import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query'
import {
  createFileRoute,
  ErrorComponent,
  Link,
  useRouter,
  type ErrorComponentProps,
} from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useEffect } from 'react'

import { useGetProfileFile } from '@/api/profile/get-file'
import { getProfileQuery } from '@/api/profile/get-profile'
import { Skeleton } from '@/components/ui/skeleton'
import { paths } from '@/config/paths'

export const Route = createFileRoute('/admin/profile/')({
  component: RouteComponent,
  errorComponent: ProfileErrorComponent,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(getProfileQuery())
  },
})

function RouteComponent() {
  const { data: profile } = useSuspenseQuery(getProfileQuery())

  const { fileUrl, loading } = useGetProfileFile(profile.photoUrl)

  return (
    <>
      <title>Profile</title>

      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4 pt-6'>
          {loading ? (
            <Skeleton className='mx-auto h-[100px] w-[100px] rounded-full' />
          ) : (
            <div className='relative space-y-2'>
              <Avatar className='mx-auto h-[100px] w-[100px]'>
                <AvatarImage
                  src={fileUrl ?? '/shadcn.jpg'}
                  alt={profile.engName}
                />
                <AvatarFallback>{profile.engName.slice(0, 2)}</AvatarFallback>
              </Avatar>

              <div className='flex justify-center gap-2'>
                <UploadProfilePhoto />
                <DeleteProfilePhoto disable={!profile.photoUrl} />
              </div>
            </div>
          )}

          <div>
            <h1 className='text-center text-2xl font-bold'>
              {profile.engName} | {profile.mmName}
            </h1>
            <p className='text-muted-foreground text-center text-sm'>
              {profile.nrc}
            </p>
          </div>

          <div className='flex gap-2'>
            <Button
              variant='secondary'
              asChild
            >
              <Link to={paths.admin.profile.update.getHref()}>
                Edit <Edit2 />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

function ProfileErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter()

  if (error instanceof AxiosError) {
    return <div>{error.response?.data.message || error.message}</div>
  }

  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  return (
    <div>
      <Button
        onClick={() => {
          router.invalidate()
        }}
      >
        retry
      </Button>
      <ErrorComponent error={error} />
    </div>
  )
}

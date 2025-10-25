import { Button } from '@/components/ui/button'
import { ProfilePhoto } from '@/features/profile/components/profile-photo'
import { ProfileSignature } from '@/features/profile/components/profile-signature'
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

import { getProfileQuery } from '@/features/profile/api/get-profile'
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

  return (
    <>
      <title>Profile</title>

      <div className='flex items-center justify-center'>
        <div className='mt-8 flex flex-col gap-4'>
          <div className='text-center'>
            <h1 className='text-2xl leading-8 font-bold'>{profile.engName}</h1>
            <h1 className='text-2xl leading-8 font-bold'>{profile.mmName}</h1>
            <p className='text-muted-foreground mt-2 text-sm'>{profile.nrc}</p>
          </div>
          <div className='flex gap-2 text-center'>
            <div>
              <p>Photo</p>
              <ProfilePhoto url={profile.photoUrl} />
            </div>
            <div>
              <p>Signature</p>
              <ProfileSignature url={profile.signatureUrl} />
            </div>
          </div>
          <Button
            variant='secondary'
            asChild
          >
            <Link to={paths.admin.profile.update.getHref()}>
              Edit Profile <Edit2 />
            </Link>
          </Button>
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

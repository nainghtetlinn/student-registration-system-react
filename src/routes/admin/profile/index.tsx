import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
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

import { getProfileQuery } from '@/api/profile/get-profile'
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
        <div className='flex flex-col items-center gap-2 pt-6'>
          <Avatar className='mx-auto h-[100px] w-[100px]'>
            <AvatarImage src='/shadcn.jpg' />
            <AvatarFallback>{profile.engName.slice(0, 2)}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className='text-center text-2xl font-bold'>
              {profile.engName} | {profile.mmName}
            </h1>
            <p className='text-muted-foreground text-center text-sm'>
              {profile.nrc}
            </p>
          </div>

          <div>
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

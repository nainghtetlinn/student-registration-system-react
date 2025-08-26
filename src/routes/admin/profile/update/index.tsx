import { paths } from '@/config/paths'
import { UpdateProfileForm } from '@/features/profile/components/update-profile-form'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/profile/update/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const profile = context.queryClient.getQueryData(['profile'])
    if (!profile) {
      throw redirect({
        to: paths.admin.profile.root.getHref(),
      })
    }
  },
  loader: ({ context }) => {
    return context.queryClient.getQueryData(['profile'])
  },
})

function RouteComponent() {
  const router = useRouter()
  const profile = Route.useLoaderData()

  return (
    <>
      <title>Update Profile</title>

      <div className='flex justify-center p-2'>
        <UpdateProfileForm
          old={profile}
          onSuccess={() => {
            router.navigate({
              to: paths.admin.profile.root.getHref(),
            })
          }}
        />
      </div>
    </>
  )
}

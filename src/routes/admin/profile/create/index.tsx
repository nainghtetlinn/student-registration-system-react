import { CreateProfileForm } from '@/features/profile/components/create-profile-form'

import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

import { paths } from '@/config/paths'

export const Route = createFileRoute('/admin/profile/create/')({
  beforeLoad: ({ context }) => {
    const profile = context.queryClient.getQueryData(['profile'])
    if (profile)
      throw redirect({
        to: paths.admin.profile.root.getHref(),
      })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  return (
    <>
      <title>Create Profile</title>

      <div className='flex justify-center p-2'>
        <CreateProfileForm
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

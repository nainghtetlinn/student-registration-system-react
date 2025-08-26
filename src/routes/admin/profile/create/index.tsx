import { paths } from '@/config/paths'
import { CreateProfileForm } from '@/features/profile/components/create-profile-form'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/profile/create/')({
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

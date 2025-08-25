import { getProfileQuery } from '@/api/profile/get-profile'
import { ProfileForm } from '@/features/profile/components/profile-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/profile/')({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(getProfileQuery())
  },
})

function RouteComponent() {
  return (
    <>
      <title>Profile</title>

      <ProfileForm />
    </>
  )
}

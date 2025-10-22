import { ReviewStudentForms } from '@/features/admin/roles/finance/components/review-student-forms'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/review/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { id } = Route.useParams()

  return (
    <>
      <title>Review Student Forms</title>

      <ReviewStudentForms
        id={id}
        onSuccess={() => {
          navigate({ to: '/admin' })
        }}
      />
    </>
  )
}

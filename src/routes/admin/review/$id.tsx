import { useUser } from '@/api/lib/auth'
import { Pending } from '@/components/layouts/shared/pending'
import { ReviewStudentForms as FinanceReview } from '@/features/admin/roles/finance/components/review-student-forms'
import { ReviewStudentForms as StudentAffairReview } from '@/features/admin/roles/student-affair/components/review-student-forms'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/review/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { id } = Route.useParams()
  const { data, isPending } = useUser()

  if (isPending) return <Pending />

  return (
    <>
      <title>Review Student Forms</title>

      {data?.role === 'Finance' && (
        <FinanceReview
          id={id}
          onSuccess={() => {
            navigate({ to: '/admin' })
          }}
        />
      )}
      {data?.role === 'Student Affair' && (
        <StudentAffairReview
          id={id}
          onSuccess={() => {
            navigate({ to: '/admin' })
          }}
        />
      )}
    </>
  )
}

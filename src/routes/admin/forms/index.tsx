import { FormsListTable } from '@/features/form/components/forms-list-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/forms/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Forms</title>

      <FormsListTable />
    </>
  )
}

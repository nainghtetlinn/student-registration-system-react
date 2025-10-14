import { SubjectChoiceForm } from '@/features/student/components/subject-choice-form'

import { createFileRoute } from '@tanstack/react-router'

import { subjectChoiceFormDefaults } from '@/features/student/schemas/subject-choice-form-schema'

export const Route = createFileRoute(
  '/student/register/subject-choice-form/$id',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Subject Choice Form</title>

      <div className='flex justify-center pt-4'>
        <SubjectChoiceForm
          isPending={false}
          errors={null}
          onSubmit={(d) => console.log(d)}
          defaultValues={subjectChoiceFormDefaults}
        />
      </div>
    </>
  )
}

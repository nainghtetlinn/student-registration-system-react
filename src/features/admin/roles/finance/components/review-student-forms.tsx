import {
  MultistepForm,
  MultistepFormCurrent,
  MultistepFormNext,
  MultistepFormPrevious,
  MultistepFormSubmit,
} from '@/components/multistep-form'
import { Card, CardFooter } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { FinanceNote } from './ui/finance-note'
import { StudentEntranceFormDetail } from './ui/student-entrance-form-detail'
import { StudentRegistrationFormDetail } from './ui/student-registration-form-detail'
import { StudentSubjectChoiceFormDetail } from './ui/student-subject-choice-form-detail'

import type { TVerifyStudentSchema } from '../schema/verify-student.schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useVerifyStudent } from '../api/verify-student.api'
import { verifyStudentSchema } from '../schema/verify-student.schema'
import { RejectBtn } from './ui/reject-btn'

export const ReviewStudentForms = ({
  id,
  onSuccess,
}: {
  id: string
  onSuccess: () => void
}) => {
  const { mutate, isPending } = useVerifyStudent(id, { onSuccess })

  const form = useForm({
    resolver: zodResolver(verifyStudentSchema),
    defaultValues: {
      financeNote: '',
      financeVoucherNumber: '',
    },
  })
  const [active, setActive] = useState(0)

  const onSubmit = (data: TVerifyStudentSchema) => {
    mutate(data)
  }

  return (
    <div className='space-y-8 p-2'>
      <div className='ml-4'>
        <h1 className='text-3xl font-bold tracking-tight text-balance'>
          Student Registration Details
        </h1>
        <p className='text-muted-foreground mt-2'>
          View and manage student registration information
        </p>
      </div>
      <MultistepForm
        active={active}
        setActive={setActive}
        form={form}
        steps={[
          {
            position: 1,
            title: '',
            fields: [],
            component: <StudentEntranceFormDetail id={id} />,
          },
          {
            position: 2,
            title: '',
            fields: [],
            component: <StudentSubjectChoiceFormDetail id={id} />,
          },
          {
            position: 3,
            title: '',
            fields: [],
            component: <StudentRegistrationFormDetail id={id} />,
          },
          {
            position: 4,
            title: '',
            fields: ['financeNote', 'financeVoucherNumber'],
            component: <FinanceNote />,
          },
        ]}
        onSubmit={onSubmit}
      >
        <Card className='relative mx-auto max-w-xl'>
          <MultistepFormCurrent />
          <CardFooter className='flex items-center justify-between'>
            <RejectBtn id={id} />
            <div className='space-x-2'>
              <MultistepFormPrevious>Previous</MultistepFormPrevious>
              <MultistepFormNext>Next</MultistepFormNext>
              <MultistepFormSubmit disabled={isPending}>
                Accept {isPending && <Spinner />}
              </MultistepFormSubmit>
            </div>
          </CardFooter>
        </Card>
      </MultistepForm>
    </div>
  )
}

import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { StudentEntranceFormDetail } from './ui/student-entrance-form-detail'
import { StudentRegistrationFormDetail } from './ui/student-registration-form-detail'
import { StudentSubjectChoiceFormDetail } from './ui/student-subject-choice-form-detail'

import { FormCardHeader } from '@/components/common/form-card-header'
import { useGetStudentEntranceForm } from '../api/get-student-entrance-form.api'
import { useGetStudentRegistrationForm } from '../api/get-student-registration-form.api'
import { useGetStudentSubjectChoiceForm } from '../api/get-student-subject-choice-form.api'

export const ReviewStudentForms = ({ id }: { id: string }) => {
  const entranceFormResult = useGetStudentEntranceForm(id)
  const subjectChoiceResult = useGetStudentSubjectChoiceForm(id)
  const registrationFormResult = useGetStudentRegistrationForm(id)

  if (
    entranceFormResult.isPending ||
    subjectChoiceResult.isPending ||
    registrationFormResult.isPending
  )
    return <FormSkeleton />

  if (
    entranceFormResult.isError ||
    subjectChoiceResult.isError ||
    registrationFormResult.isError
  )
    return <div>Error</div>

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
      <Card className='relative'>
        <FormCardHeader
          form={entranceFormResult.data.formData}
          title='တက္ကသိုလ်ဝင်ခွင့်လျှောက်လွှာ'
        />
        <CardContent>
          <StudentEntranceFormDetail data={entranceFormResult.data} />
        </CardContent>
      </Card>
      <Card className='relative'>
        <FormCardHeader
          form={subjectChoiceResult.data.formData}
          title='အထူးပြုဘာသာရပ်ရွေးချယ်ခွင့်လျှောက်လွှာ'
        />
        <CardContent>
          <StudentSubjectChoiceFormDetail data={subjectChoiceResult.data} />
        </CardContent>
      </Card>
      <Card className='relative'>
        <FormCardHeader
          form={registrationFormResult.data.formData}
          title='ကျောင်းသားမှတ်ပုံတင်ခွင့်လျှောက်လွှာ'
        />
        <CardContent>
          <StudentRegistrationFormDetail data={registrationFormResult.data} />
        </CardContent>
      </Card>
    </div>
  )
}

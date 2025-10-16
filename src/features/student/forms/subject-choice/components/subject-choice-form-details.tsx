import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Edit2 } from 'lucide-react'

import type { TForm } from '@/types/form'
import type { TSubjectChoiceFormSchema } from '../schema/subject-choice-form.schema'

import { Link } from '@tanstack/react-router'

import { nrcObjectToString } from '@/lib/utils'

export const SubjectChoiceFormDetails = ({
  formDetails,
  formData,
}: {
  formDetails: TForm
  formData: TSubjectChoiceFormSchema
}) => {
  return (
    <Card className='relative mx-auto w-full max-w-3xl'>
      <CardHeader className='text-center'>
        <Button
          className='absolute top-3 right-3'
          asChild
          variant='outline'
          size='icon'
        >
          <Link to='/student/forms/subject-choice/update'>
            <Edit2 />
          </Link>
        </Button>
        <CardTitle className='text-2xl'>Subject Choice Form Details</CardTitle>
        <CardDescription>{`${formDetails.academicYear} ပညာသင်နှစ်`}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Student</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name'
            value={formData.student.name}
          />
          <Info
            label='Other Name'
            value={formData.student.otherName}
          />
          <Info
            label='NRC'
            value={nrcObjectToString(formData.student.nrc)}
          />
          <Info
            label='Ethnicity'
            value={formData.student.ethnicity}
          />
          <Info
            label='Religion'
            value={formData.student.religion}
          />
          <Info
            label='Place of Birth'
            value={formData.student.pob}
          />
          <Info
            label='Date of Birth'
            value={formData.student.dob.toISOString().split('T')[0]}
          />
          <Info
            label='Phone Number'
            value={formData.student.phoneNumber}
          />
          <Info
            label='Enrollment Number'
            value={formData.student.enrollmentNumber}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>
          Matriculation
        </h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Matric Roll No'
            value={formData.matriculation.rollNo}
          />
          <Info
            label='Matric Year'
            value={formData.matriculation.year}
          />
          <Info
            label='Matric Department'
            value={formData.matriculation.department}
          />
          <Info
            label='Myanmar Marks'
            value={String(formData.matriculation.myanmar)}
          />
          <Info
            label='English Marks'
            value={String(formData.matriculation.english)}
          />
          <Info
            label='Mathematic Marks'
            value={String(formData.matriculation.mathematic)}
          />
          <Info
            label='Chemistry Marks'
            value={String(formData.matriculation.chemistry)}
          />
          <Info
            label='Physics Marks'
            value={String(formData.matriculation.physics)}
          />
          <Info
            label='Other Marks'
            value={String(formData.matriculation.other)}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Father</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name'
            value={formData.father.name}
          />
          <Info
            label='Other Name'
            value={formData.father.otherName}
          />
          <Info
            label='NRC'
            value={nrcObjectToString(formData.father.nrc)}
          />
          <Info
            label='Ethnicity'
            value={formData.father.ethnicity}
          />
          <Info
            label='Religion'
            value={formData.father.religion}
          />
          <Info
            label='Place of Birth'
            value={formData.father.pob}
          />
          <Info
            label='Date of Birth'
            value={formData.father.dob.toISOString().split('T')[0]}
          />
          <Info
            label='Phone Number'
            value={formData.father.phoneNumber}
          />
          <Info
            label='Job'
            value={formData.father.job}
          />
          <Info
            label='Address'
            value={formData.father.address}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Mother</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name'
            value={formData.mother.name}
          />
          <Info
            label='Other Name'
            value={formData.mother.otherName}
          />
          <Info
            label='NRC'
            value={nrcObjectToString(formData.mother.nrc)}
          />
          <Info
            label='Ethnicity'
            value={formData.mother.ethnicity}
          />
          <Info
            label='Religion'
            value={formData.mother.religion}
          />
          <Info
            label='Place of Birth'
            value={formData.mother.pob}
          />
          <Info
            label='Date of Birth'
            value={formData.mother.dob.toISOString().split('T')[0]}
          />
          <Info
            label='Phone Number'
            value={formData.mother.phoneNumber}
          />
          <Info
            label='Job'
            value={formData.mother.job}
          />
          <Info
            label='Address'
            value={formData.mother.address}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>
          Major Choices
        </h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          {formData.majorChoices.map((choice, i) => (
            <Info
              key={i}
              label={`Choice ${i + 1}`}
              value={`${choice.majorName} (Priority: ${choice.priorityScore})`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <span className='text-muted-foreground block'>{label}</span>
      <span className='text-card-foreground block'>{value || '-'}</span>
    </div>
  )
}

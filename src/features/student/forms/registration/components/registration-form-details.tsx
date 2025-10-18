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
import type { TRegistrationFormSchema } from '../schema/registration-form.schema'

import { Link } from '@tanstack/react-router'

import { cn, nrcObjectToString } from '@/lib/utils'

export const RegistrationFormDetails = ({
  formDetails,
  formData,
}: {
  formDetails: TForm
  formData: TRegistrationFormSchema
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
          <Link to='/student/forms/registration/update'>
            <Edit2 />
          </Link>
        </Button>
        <CardTitle className='text-2xl'>Registration Form Details</CardTitle>
        <CardDescription>{`${formDetails.academicYear} ပညာသင်နှစ်`}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Student</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name (English)'
            value={formData.student.nameEn}
          />
          <Info
            label='Name (Myanmar)'
            value={formData.student.nameMm}
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
            label='Enrollment Number'
            value={formData.student.enrollmentNumber}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Father</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name (English)'
            value={formData.father.nameEn}
          />
          <Info
            label='Name (Myanmar)'
            value={formData.father.nameMm}
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
            label='Job'
            value={formData.father.job}
          />
          <Info
            label='Address'
            value={formData.father.address}
          />
          <Info
            label='Year of Death'
            value={formData.father.yod ? String(formData.father.yod) : '-'}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Mother</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name (English)'
            value={formData.mother.nameEn}
          />
          <Info
            label='Name (Myanmar)'
            value={formData.mother.nameMm}
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
            label='Job'
            value={formData.mother.job}
          />
          <Info
            label='Address'
            value={formData.mother.address}
          />
          <Info
            label='Year of Death'
            value={formData.mother.yod ? String(formData.mother.yod) : '-'}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Siblings</h4>
        {formData.siblings.length > 0 ? (
          formData.siblings.map((sibling, index) => (
            <div
              key={index}
              className={cn(
                'grid grid-cols-1 gap-x-8 gap-y-4 pt-4 md:grid-cols-2',
                index > 0 && 'border-t',
              )}
            >
              <Info
                label={`Name`}
                value={sibling.name}
              />
              <Info
                label='NRC'
                value={nrcObjectToString(sibling.nrc)}
              />
              <Info
                label='Job'
                value={sibling.job}
              />
              <Info
                label='Address'
                value={sibling.address}
              />
            </div>
          ))
        ) : (
          <p className='rounded border py-4 text-center'>No Siblings.</p>
        )}
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

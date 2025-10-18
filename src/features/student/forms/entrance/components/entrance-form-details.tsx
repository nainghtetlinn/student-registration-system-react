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
import type { TEntranceFormSchema } from '../schema/entrance-form.schema'

import { Link } from '@tanstack/react-router'

import { nrcObjectToString } from '@/lib/utils'

export const EntranceFormDetails = ({
  formDetails,
  formData,
}: {
  formDetails: TForm
  formData: TEntranceFormSchema
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
          <Link to='/student/forms/entrance/update'>
            <Edit2 />
          </Link>
        </Button>
        <CardTitle className='text-2xl'>Entrance Form Details</CardTitle>
        <CardDescription>{`${formDetails.academicYear} ပညာသင်နှစ်`}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Student</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Academic Year'
            value={formDetails.academicYear}
          />
          <Info
            label='Enrollment Number'
            value={formData.student.enrollmentNumber}
          />
          <Info
            label='Name (MM)'
            value={formData.student.nameMm}
          />
          <Info
            label='Name (Eng)'
            value={formData.student.nameEn}
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
            label='NRC'
            value={nrcObjectToString(formData.student.nrc)}
          />
          <Info
            label='Date of Birth'
            value={formData.student.dob.toISOString().split('T')[0]}
          />
          <Info
            label='Matriculation Passed Year'
            value={formData.student.matriculationPassedYear}
          />
          <Info
            label='Matriculation Department'
            value={formData.student.matriculationDepartment}
          />
        </div>

        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Father</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name (MM)'
            value={formData.father.nameMm}
          />
          <Info
            label='Name (Eng)'
            value={formData.father.nameEn}
          />
          <Info
            label='NRC'
            value={nrcObjectToString(formData.father.nrc)}
          />
          <Info
            label='Job'
            value={formData.father.job}
          />
        </div>

        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Mother</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name (MM)'
            value={formData.mother.nameMm}
          />
          <Info
            label='Name (Eng)'
            value={formData.mother.nameEn}
          />
          <Info
            label='NRC'
            value={nrcObjectToString(formData.mother.nrc)}
          />
          <Info
            label='Job'
            value={formData.mother.job}
          />
        </div>

        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Contacts</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Address'
            value={formData.contact.address}
          />
          <Info
            label='Phone Number'
            value={formData.contact.phoneNumber}
          />
          <Info
            label='Permanent Address'
            value={formData.contact.permanentAddress}
          />
          <Info
            label='Permanent Phone Number'
            value={formData.contact.permanentPhoneNumber}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className='text-muted-foreground block'>{label}</span>
      <span className='text-card-foreground block'>{value || '-'}</span>
    </div>
  )
}

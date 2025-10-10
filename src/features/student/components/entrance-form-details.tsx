import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Edit2 } from 'lucide-react'

import { Link } from '@tanstack/react-router'

import { nrcObjectToString } from '@/lib/utils'
import { type TEntranceFormSchema } from '../schemas/entrance-form-schema'
import type { TForm } from '@/types/form'

export const EntranceFormDetails = ({
  formDetails,
  formData,
}: {
  formDetails: TForm
  formData: TEntranceFormSchema
}) => {
  return (
    <Card className='relative w-full max-w-2xl'>
      <CardHeader className='text-center'>
        <Button
          className='absolute top-3 right-3'
          asChild
          variant='outline'
          size='icon'
        >
          <Link
            to='/student/update/entrance-form/$id'
            params={{ id: formDetails.id.toString() }}
          >
            <Edit2 />
          </Link>
        </Button>
        <CardTitle className='text-2xl'>Entrance Form Details</CardTitle>
        <CardDescription>{`${new Date().getFullYear()}-${new Date().getFullYear() + 1} ပညာသင်နှစ်`}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Academic Year'
            value={`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`}
          />
          <Info
            label='Student Name (MM)'
            value={formData.student.nameMm}
          />
          <Info
            label='Student Name (Eng)'
            value={formData.student.nameEn}
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
          <Info
            label='Matriculation Roll Number'
            value={formData.student.enrollmentNumber}
          />
          <Info
            label='Father Name (MM)'
            value={formData.father.nameMm}
          />
          <Info
            label='Father Name (Eng)'
            value={formData.father.nameEn}
          />
          <Info
            label='Father NRC'
            value={nrcObjectToString(formData.father.nrc)}
          />
          <Info
            label='Father Job'
            value={formData.father.job}
          />
          <Info
            label='Mother Name (MM)'
            value={formData.mother.nameMm}
          />
          <Info
            label='Mother Name (Eng)'
            value={formData.mother.nameEn}
          />
          <Info
            label='Mother NRC'
            value={nrcObjectToString(formData.mother.nrc)}
          />
          <Info
            label='Mother Job'
            value={formData.mother.job}
          />
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

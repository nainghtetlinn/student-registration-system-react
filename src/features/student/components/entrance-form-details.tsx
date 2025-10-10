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

import { paths } from '@/config/paths'
import { type TEntranceFormSchema } from '../schemas/entrance-form-schema'
import { nrcObjectToString } from '@/lib/utils'

export const EntranceFormDetails = ({
  data,
}: {
  data: TEntranceFormSchema
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
          <Link to={paths.student.update.root.getHref()}>
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
            value={data.student.nameMm}
          />
          <Info
            label='Student Name (Eng)'
            value={data.student.nameEn}
          />
          <Info
            label='NRC'
            value={nrcObjectToString(data.student.nrc)}
          />
          <Info
            label='Ethnicity'
            value={data.student.ethnicity}
          />
          <Info
            label='Religion'
            value={data.student.religion}
          />
          <Info
            label='Date of Birth'
            value={data.student.dob.toISOString().split('T')[0]}
          />
          <Info
            label='Matriculation Passed Year'
            value={data.student.matriculationPassedYear}
          />
          <Info
            label='Matriculation Department'
            value={data.student.matriculationDepartment}
          />
          <Info
            label='Matriculation Roll Number'
            value={data.student.enrollmentNumber}
          />
          <Info
            label='Father Name (MM)'
            value={data.father.nameMm}
          />
          <Info
            label='Father Name (Eng)'
            value={data.father.nameEn}
          />
          <Info
            label='Father NRC'
            value={nrcObjectToString(data.father.nrc)}
          />
          <Info
            label='Father Job'
            value={data.father.job}
          />
          <Info
            label='Mother Name (MM)'
            value={data.mother.nameMm}
          />
          <Info
            label='Mother Name (Eng)'
            value={data.mother.nameEn}
          />
          <Info
            label='Mother NRC'
            value={nrcObjectToString(data.mother.nrc)}
          />
          <Info
            label='Mother Job'
            value={data.mother.job}
          />
          <Info
            label='Address'
            value={data.contact.address}
          />
          <Info
            label='Phone Number'
            value={data.contact.phoneNumber}
          />
          <Info
            label='Permanent Address'
            value={data.contact.permanentAddress}
          />
          <Info
            label='Permanent Phone Number'
            value={data.contact.permanentPhoneNumber}
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

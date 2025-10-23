import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Edit2 } from 'lucide-react'

import type { TGetEntranceFormResponse } from '../types/get.type'

import { Link } from '@tanstack/react-router'

export const EntranceFormDetails = ({
  data,
}: {
  data: TGetEntranceFormResponse
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
        <CardDescription>{`${data.formData.academicYear} ပညာသင်နှစ်`}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Student</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Academic Year'
            value={data.formData.academicYear}
          />
          <Info
            label='Enrollment Number'
            value={data.enrollmentNumber}
          />
          <Info
            label='Name (MM)'
            value={data.studentNameMm}
          />
          <Info
            label='Name (Eng)'
            value={data.studentNameEng}
          />
          <Info
            label='Ethnicity'
            value={data.ethnicity}
          />
          <Info
            label='Religion'
            value={data.religion}
          />
          <Info
            label='NRC'
            value={data.studentNrc}
          />
          <Info
            label='Date of Birth'
            value={data.dob}
          />
          <Info
            label='Matriculation Passed Year'
            value={data.matriculationPassedYear}
          />
          <Info
            label='Matriculation Department'
            value={data.department}
          />
        </div>

        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Father</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name (MM)'
            value={data.fatherNameMm}
          />
          <Info
            label='Name (Eng)'
            value={data.fatherNameEng}
          />
          <Info
            label='NRC'
            value={data.fatherNrc}
          />
          <Info
            label='Job'
            value={data.fatherJob}
          />
        </div>

        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Mother</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name (MM)'
            value={data.motherNameMm}
          />
          <Info
            label='Name (Eng)'
            value={data.motherNameEng}
          />
          <Info
            label='NRC'
            value={data.motherNrc}
          />
          <Info
            label='Job'
            value={data.motherJob}
          />
        </div>

        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Contacts</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Address'
            value={data.address}
          />
          <Info
            label='Phone Number'
            value={data.phoneNumber}
          />
          <Info
            label='Permanent Address'
            value={data.permanentAddress}
          />
          <Info
            label='Permanent Phone Number'
            value={data.permanentPhoneNumber}
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

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Edit2 } from 'lucide-react'

import type { TGetRegistrationFormResponse } from '../types/get.type'

import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

export const RegistrationFormDetails = ({
  data,
}: {
  data: TGetRegistrationFormResponse
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
        <CardDescription>{`${data.formData.academicYear} ပညာသင်နှစ်`}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Student</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name (English)'
            value={data.studentNameEng}
          />
          <Info
            label='Name (Myanmar)'
            value={data.studentNameMm}
          />
          <Info
            label='Other Name'
            value={data.studentNickname || '-'}
          />
          <Info
            label='NRC'
            value={data.studentNrc}
          />
          <Info
            label='Ethnicity'
            value={data.studentEthnicity}
          />
          <Info
            label='Religion'
            value={data.studentReligion}
          />
          <Info
            label='Place of Birth'
            value={data.studentPob}
          />
          <Info
            label='Date of Birth'
            value={data.studentDob}
          />
          <Info
            label='Enrollment Number'
            value={data.enrollmentNumber}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Father</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name (English)'
            value={data.fatherNameEng}
          />
          <Info
            label='Name (Myanmar)'
            value={data.fatherNameMm}
          />
          <Info
            label='Other Name'
            value={data.fatherNickname || '-'}
          />
          <Info
            label='NRC'
            value={data.fatherNrc}
          />
          <Info
            label='Ethnicity'
            value={data.fatherEthnicity}
          />
          <Info
            label='Religion'
            value={data.fatherReligion}
          />
          <Info
            label='Place of Birth'
            value={data.fatherPob}
          />
          <Info
            label='Date of Birth'
            value={data.fatherDob}
          />
          <Info
            label='Job'
            value={data.fatherJob}
          />
          <Info
            label='Address'
            value={data.fatherAddress}
          />
          <Info
            label='Year of Death'
            value={data.fatherDeathDate || '-'}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Mother</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name (English)'
            value={data.motherNameEng}
          />
          <Info
            label='Name (Myanmar)'
            value={data.motherNameMm}
          />
          <Info
            label='Other Name'
            value={data.motherNickname || '-'}
          />
          <Info
            label='NRC'
            value={data.motherNrc}
          />
          <Info
            label='Ethnicity'
            value={data.motherEthnicity}
          />
          <Info
            label='Religion'
            value={data.motherReligion}
          />
          <Info
            label='Place of Birth'
            value={data.motherPob}
          />
          <Info
            label='Date of Birth'
            value={data.motherDob}
          />
          <Info
            label='Job'
            value={data.motherJob}
          />
          <Info
            label='Address'
            value={data.motherAddress}
          />
          <Info
            label='Year of Death'
            value={data.motherDeathDate || '-'}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Siblings</h4>
        {data.siblings.length > 0 ? (
          data.siblings.map((sibling, index) => (
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
                value={sibling.nrc}
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

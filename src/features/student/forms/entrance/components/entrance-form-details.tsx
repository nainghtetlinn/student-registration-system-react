import { FormCardHeader } from '@/components/common/form-card-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

import type { TGetEntranceFormResponse } from '../types/get.type'

import { Link } from '@tanstack/react-router'

import { useGetFile } from '../api/get-file.api'

export const EntranceFormDetails = ({
  data,
}: {
  data: TGetEntranceFormResponse
}) => {
  const photoResult = useGetFile(data.studentPhotoUrl, 'Profile Photo')
  const signResult = useGetFile(data.studentSignatureUrl, 'Signature')
  const paymentResult = useGetFile(data.studentSignatureUrl, 'Payment')
  const financeSignResult = useGetFile(data.studentSignatureUrl, 'Finance Sign')

  return (
    <Card className='relative mx-auto w-full max-w-3xl'>
      <Button
        className='absolute top-16 right-3'
        asChild
        variant='outline'
        size='icon'
      >
        <Link to='/student/forms/entrance/update'>
          <Edit2 />
        </Link>
      </Button>
      <FormCardHeader
        form={data.formData}
        title='တက္ကသိုလ်ဝင်ခွင့်လျှောက်လွှာ'
      />
      <CardContent>
        <div>
          <div className='h-[150px] w-[150px] overflow-hidden rounded border'>
            {photoResult.loading ? (
              <Skeleton className='h-full w-full' />
            ) : (
              <img
                src={photoResult.fileUrl || ''}
                alt='Photo'
                className='h-full w-full object-contain'
              />
            )}
          </div>
        </div>
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

        <div className='my-2 flex justify-end gap-2'>
          <div className='h-[150px] w-[150px] overflow-hidden rounded border'>
            {signResult.loading ? (
              <Skeleton className='h-full w-full' />
            ) : (
              <img
                src={signResult.fileUrl || ''}
                alt='Photo'
                className='h-full w-full object-contain'
              />
            )}
          </div>
          <div className='h-[150px] w-[150px] overflow-hidden rounded border'>
            {financeSignResult.loading ? (
              <Skeleton className='h-full w-full' />
            ) : (
              <img
                src={financeSignResult.fileUrl || ''}
                alt='Photo'
                className='h-full w-full object-contain'
              />
            )}
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='h-[500px] w-[300px] overflow-hidden rounded border'>
            {paymentResult.loading ? (
              <Skeleton className='h-full w-full' />
            ) : (
              <img
                src={paymentResult.fileUrl || ''}
                alt='Photo'
                className='h-full w-full object-contain'
              />
            )}
          </div>
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

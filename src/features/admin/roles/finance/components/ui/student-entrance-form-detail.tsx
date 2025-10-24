import { FormCardHeader } from '@/components/common/form-card-header'
import { Image } from '@/components/common/image'
import { CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { ImageOff } from 'lucide-react'
import { Info } from './info'

import { useGetFile } from '@/features/admin/api/get-file'
import { useGetStudentEntranceForm } from '../../api/get-student-entrance-form.api'

export const StudentEntranceFormDetail = ({ id }: { id: string }) => {
  const { data, isPending, isError } = useGetStudentEntranceForm(id)

  const photoResult = useGetFile(data?.studentPhotoUrl)
  const signResult = useGetFile(data?.studentSignatureUrl)
  const paymentResult = useGetFile(data?.departmentSection.paymentUrl)

  if (isPending)
    return (
      <div className='flex h-[500px] items-center justify-center'>
        <Spinner />
      </div>
    )

  if (isError) return <div>Something went wrong.</div>

  return (
    <>
      <FormCardHeader
        form={data.formData}
        title='တက္ကသိုလ်ဝင်ခွင့်လျှောက်လွှာ'
      />
      <CardContent>
        <div className='mt-4'>
          <Image
            loading={photoResult.loading}
            url={photoResult.fileUrl}
            alt='Profile photo'
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Student</h4>
        <div></div>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
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
        <div className='flex justify-end'>
          <Image
            loading={signResult.loading}
            url={signResult.fileUrl}
            alt='Student Sign'
          />
        </div>

        <div className='mt-2 flex justify-center'>
          <div className='h-[600px] w-[350px] overflow-hidden rounded border'>
            {paymentResult.loading ? (
              <Skeleton className='h-full w-full' />
            ) : paymentResult.fileUrl ? (
              <img
                src={paymentResult.fileUrl}
                alt={'Payment screenshot'}
                className='h-full w-full object-contain'
              />
            ) : (
              <div className='text-muted-foreground flex h-full w-full items-center justify-center'>
                <ImageOff className='h-8 w-8' />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </>
  )
}

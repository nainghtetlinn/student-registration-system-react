import { FormCardHeader } from '@/components/common/form-card-header'
import { Image } from '@/components/common/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit2 } from 'lucide-react'

import type { TGetRegistrationFormResponse } from '../types/get.type'

import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { useGetFile } from '../api/get-file.api'

export const RegistrationFormDetails = ({
  editable = false,
  data,
}: {
  editable: boolean
  data: TGetRegistrationFormResponse
}) => {
  //   const photoResult = useGetFile(data.studentPhotoUrl, 'Profile Photo')
  const studentSignResult = useGetFile(
    data.studentSignatureUrl,
    'Student Signature',
  )
  const guardianSignResult = useGetFile(
    data.guardianSginatureUrl,
    'Guardian Signature',
  )

  return (
    <Card className='relative mx-auto w-full max-w-3xl'>
      {editable && (
        <Button
          className='absolute top-16 right-3'
          asChild
          variant='outline'
          size='icon'
        >
          <Link to='/student/forms/registration/update'>
            <Edit2 />
          </Link>
        </Button>
      )}
      <FormCardHeader
        form={data.formData}
        title='ကျောင်းသားမှတ်ပုံတင်ခွင့်လျှောက်လွှာ'
      />
      <CardContent>
        {/* <div>
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
        </div> */}
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

        <div className='mt-4 flex justify-end gap-4'>
          <div className='flex flex-col items-center'>
            <h5 className='text-xs leading-8 font-semibold'>
              ဝင်ခွင့်လျှောက်ထားသူလက်မှတ်၊အမည်
            </h5>
            <Image
              loading={studentSignResult.loading}
              url={studentSignResult.fileUrl}
              alt='Student Sign'
            />
            <h5>{data.studentNameEng}</h5>
            <p className='text-muted-foreground text-xs'>
              {data.studentSignatureDate}
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <h5 className='text-xs leading-8 font-semibold'>
              မိဘ(သို့မဟုတ်)အုပ်ထိန်းသူ၏လက်မှတ်၊အမည်
            </h5>
            <Image
              loading={guardianSignResult.loading}
              url={guardianSignResult.fileUrl}
              alt='Guardian Sign'
            />
            <h5>{data.guardianName}</h5>
            <p className='text-muted-foreground text-xs'>
              {data.guardianSignatureDate}
            </p>
          </div>
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

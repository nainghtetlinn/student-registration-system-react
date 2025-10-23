import { FormCardHeader } from '@/components/common/form-card-header'
import { Image } from '@/components/common/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit2 } from 'lucide-react'

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
  //   const paymentResult = useGetFile(data.studentSignatureUrl, 'Payment')
  const financeSignResult = useGetFile(
    data.departmentSection.financeVerifierSignature,
    'Finance Sign',
  )

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
          <Image
            loading={photoResult.loading}
            url={photoResult.fileUrl}
            alt='Profile photo'
          />
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

        <div className='mt-6 space-y-2'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground block'>
              ကျောင်းသားရေးရာဌာနမှတ်ချက်
            </span>
            <span className='text-card-foreground block'>
              {data.departmentSection.studentAffairNote || '-'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground block'>
              အခြားထောက်ခံချက်
            </span>
            <span className='text-card-foreground block'>
              {data.departmentSection.studentAffairOtherNote || '-'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground block'>
              စစ်ဆေးသည့်ရက်စွဲ
            </span>
            <span className='text-card-foreground block'>
              {data.departmentSection.studentAffairVerifiedDate || '-'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground block'>
              ငွေစာရင်းဌာနမှတ်ချက်
            </span>
            <span className='text-card-foreground block'>
              {data.departmentSection.financeNote || '-'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground block'>
              ကျောင်းလခပေးသွင်းရက်စွဲ
            </span>
            <span className='text-card-foreground block'>
              {data.departmentSection.financeDate || '-'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground block'>ပြေစာအမှတ်</span>
            <span className='text-card-foreground block'>
              {data.departmentSection.financeVoucherNumber || '-'}
            </span>
          </div>
        </div>

        <div className='mt-4 flex justify-end gap-4'>
          <div className='flex flex-col items-center'>
            <h5 className='text-xs leading-8 font-semibold'>
              ကျောင်းသား/သူလက်မှတ်
            </h5>
            <Image
              loading={signResult.loading}
              url={signResult.fileUrl}
              alt='Student Sign'
            />
            <h5>{data.studentNameEng}</h5>
          </div>
          <div className='flex flex-col items-center'>
            <h5 className='text-xs leading-8 font-semibold'>
              စစ်ဆေးလက်ခံသူအမည်နှင့်လက်မှတ်
            </h5>
            <Image
              loading={financeSignResult.loading}
              url={financeSignResult.fileUrl}
              alt='Finance Sign'
            />
            <h5>{data.departmentSection.financeVerifierName || '-'}</h5>
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

import { FormCardHeader } from '@/components/common/form-card-header'
import { CardContent } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Info } from './info'

import { cn } from '@/lib/utils'
import { useGetStudentRegistrationForm } from '../../api/get-student-registration-form.api'

export const StudentRegistrationFormDetail = ({ id }: { id: string }) => {
  const { data, isPending, isError } = useGetStudentRegistrationForm(id)

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
        title='ကျောင်းသားမှတ်ပုံတင်ခွင့်လျှောက်လွှာ'
      />
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
    </>
  )
}

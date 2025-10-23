import { FormCardHeader } from '@/components/common/form-card-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Edit2 } from 'lucide-react'

import type { TGetSubjectChoiceFormResponse } from '../types/get.type'

import { Link } from '@tanstack/react-router'

import { useGetFile } from '../api/get-file.api'

export const SubjectChoiceFormDetails = ({
  data,
}: {
  data: TGetSubjectChoiceFormResponse
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
      <Button
        className='absolute top-16 right-3'
        asChild
        variant='outline'
        size='icon'
      >
        <Link to='/student/forms/subject-choice/update'>
          <Edit2 />
        </Link>
      </Button>
      <FormCardHeader
        form={data.formData}
        title='အထူးပြုဘာသာရပ်ရွေးချယ်ခွင့်လျှောက်လွှာ'
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
            label='Name'
            value={data.studentNameEng}
          />
          <Info
            label='Other Name'
            value={data.studentNickname || '-'}
          />
          <Info
            label='Enrollment Number'
            value={data.enrollmentNumber}
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
            label='Phone Number'
            value={data.studentPhoneNumber}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Father</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name'
            value={data.fatherNameEng}
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
            label='Job'
            value={data.fatherJob}
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
            label='Phone Number'
            value={data.fatherPhoneNumber}
          />
          <Info
            label='Address'
            value={data.fatherAddress}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>Mother</h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Name'
            value={data.motherNameEng}
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
            label='Job'
            value={data.motherJob}
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
            label='Phone Number'
            value={data.motherPhoneNumber}
          />
          <Info
            label='Address'
            value={data.motherAddress}
          />
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>
          Matriculation
        </h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Matric Roll No'
            value={data.matriculationRollNumber}
          />
          <Info
            label='Matric Year'
            value={data.matriculationPassedYear}
          />
          <Info
            label='Matric Department'
            value={data.department}
          />
          <Info
            label='Total'
            value={String(
              data.subjectScores.reduce(
                (total, current) => (total += current.score),
                0,
              ),
            )}
          />
          {data.subjectScores.map((subject, i) => (
            <Info
              key={i}
              label={subject.subjectName}
              value={String(subject.score)}
            />
          ))}
        </div>
        <h4 className='mt-4 mb-2 text-center text-2xl font-bold'>
          Major Choices
        </h4>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          {data.majorChoices.map((choice, i) => (
            <Info
              key={i}
              label={`Choice ${i + 1}`}
              value={`${choice.majorName} (Priority: ${choice.priorityScore})`}
            />
          ))}
        </div>

        <div className='mt-4 flex justify-end gap-4'>
          <div className='flex flex-col items-center'>
            <h5 className='text-xs leading-8 font-semibold'>
              ဝင်ခွင့်လျှောက်ထားသူလက်မှတ်၊အမည်
            </h5>
            <div className='h-[150px] w-[150px] overflow-hidden rounded border'>
              {studentSignResult.loading ? (
                <Skeleton className='h-full w-full' />
              ) : (
                <img
                  src={studentSignResult.fileUrl || ''}
                  alt='Photo'
                  className='h-full w-full object-contain'
                />
              )}
            </div>
            <h5>{data.studentNameEng}</h5>
            <p className='text-muted-foreground text-xs'>
              {data.studentSignatureDate}
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <h5 className='text-xs leading-8 font-semibold'>
              မိဘ(သို့မဟုတ်)အုပ်ထိန်းသူ၏လက်မှတ်၊အမည်
            </h5>
            <div className='h-[150px] w-[150px] overflow-hidden rounded border'>
              {guardianSignResult.loading ? (
                <Skeleton className='h-full w-full' />
              ) : (
                <img
                  src={guardianSignResult.fileUrl || ''}
                  alt='Photo'
                  className='h-full w-full object-contain'
                />
              )}
            </div>
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

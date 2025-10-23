import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Edit2 } from 'lucide-react'

import type { TGetSubjectChoiceFormResponse } from '../types/get.type'

import { Link } from '@tanstack/react-router'

export const SubjectChoiceFormDetails = ({
  data,
}: {
  data: TGetSubjectChoiceFormResponse
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
          <Link to='/student/forms/subject-choice/update'>
            <Edit2 />
          </Link>
        </Button>
        <CardTitle className='text-2xl'>Subject Choice Form Details</CardTitle>
        <CardDescription>{`${data.formData.academicYear} ပညာသင်နှစ်`}</CardDescription>
      </CardHeader>
      <CardContent>
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

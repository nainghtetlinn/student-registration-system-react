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
import type { TEntranceForm } from '@/types/student'

export const EntranceFormDetails = ({ data }: { data: TEntranceForm }) => {
  return (
    <Card className='relative w-full max-w-2xl'>
      <CardHeader className='text-center'>
        <Button
          className='absolute top-3 right-3'
          asChild
        >
          <Link to={paths.student.entranceForm.update.root.getHref()}>
            Update <Edit2 />
          </Link>
        </Button>
        <CardTitle className='text-2xl'>Entrance Form Details</CardTitle>
        <CardDescription>{`${new Date().getFullYear()}-${new Date().getFullYear() + 1} ပညာသင်နှစ်`}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
          <Info
            label='Academic Year'
            value={data.academicYear}
          />
          <Info
            label='Roll Number'
            value={data.rollNumber}
          />
          <Info
            label='Student Name (MM)'
            value={data.studentNameMm}
          />
          <Info
            label='Student Name (Eng)'
            value={data.studentNameEng}
          />
          <Info
            label='NRC'
            value={data.studentNrc}
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
            label='Date of Birth'
            value={data.dob}
          />
          <Info
            label='Matriculation Passed Year'
            value={data.matriculationPassedYear}
          />
          <Info
            label='Department'
            value={data.department}
          />
          <Info
            label='Father Name (MM)'
            value={data.fatherNameMm}
          />
          <Info
            label='Father Name (Eng)'
            value={data.fatherNameEng}
          />
          <Info
            label='Father NRC'
            value={data.fatherNrc}
          />
          <Info
            label='Father Job'
            value={data.fatherJob}
          />
          <Info
            label='Mother Name (MM)'
            value={data.motherNameMm}
          />
          <Info
            label='Mother Name (Eng)'
            value={data.motherNameEng}
          />
          <Info
            label='Mother NRC'
            value={data.motherNrc}
          />
          <Info
            label='Mother Job'
            value={data.motherJob}
          />
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

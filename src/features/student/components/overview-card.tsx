import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'
import { DownloadBtn } from './download-btn'

export const OverviewCard = ({
  studentId,
  title,
  submitted = false,
  paid = false,
  verified = false,
}: {
  studentId: number
  title: string
  submitted: boolean
  paid: boolean
  verified: boolean
}) => {
  const renderStatus = (label: string, value: boolean) => {
    return (
      <div className='flex items-center justify-between border-b py-2 last:border-0'>
        <span className='text-muted-foreground'>{label}</span>
        {value ? (
          <span className='flex items-center gap-1 text-green-600'>
            <span>Accepted</span>
            <CheckCircle2 size={16} />
          </span>
        ) : (
          <span className='flex items-center gap-1 text-red-500'>
            <span>Pending</span>
            <XCircle size={16} />
          </span>
        )}
      </div>
    )
  }

  return (
    <Card className='bg-card rounded-2xl border shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
        <Badge
          variant={verified && paid && submitted ? 'default' : 'outline'}
          className='flex items-center gap-1'
        >
          {!verified && !paid && !submitted ? (
            <Clock size={14} />
          ) : (
            <CheckCircle2 size={14} />
          )}
          {verified && paid && submitted ? 'Completed' : 'Pending'}
        </Badge>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex items-center justify-between border-b py-2 last:border-0'>
          <span className='text-muted-foreground'>Form Submitted</span>
          {submitted ? (
            <span className='flex items-center gap-1 text-green-600'>
              <span>Submitted</span>
              <CheckCircle2 size={16} />
            </span>
          ) : (
            <span className='flex items-center gap-1 text-red-500'>
              <span>Pending</span>
              <XCircle size={16} />
            </span>
          )}
        </div>
        {renderStatus('Finance Department', paid)}
        {renderStatus('Student Affair Department', verified)}
        <div className='flex gap-2'>
          <DownloadBtn
            studentId={studentId}
            label='Entrance Form'
            type='Entrance Form'
          />
          <DownloadBtn
            studentId={studentId}
            label='Subject Choice Form'
            type='Subject Choice'
          />
          <DownloadBtn
            studentId={studentId}
            label='Registration Form'
            type='Registration'
          />
        </div>
      </CardContent>
      {!submitted && (
        <CardFooter className='flex items-center justify-between'>
          <p>Acknowledge rules of university to actually submit the form.</p>
          <Button asChild>
            <Link to='/student/forms/acknowledge'>Acknowledge</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

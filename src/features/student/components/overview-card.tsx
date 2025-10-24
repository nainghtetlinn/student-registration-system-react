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

export const OverviewCard = ({
  title,
  submitted = false,
  paid = false,
  verified = false,
}: {
  title: string
  submitted: boolean
  paid: boolean
  verified: boolean
}) => {
  const renderStatus = (label: string, value: boolean) => (
    <div className='flex items-center justify-between border-b py-2 last:border-0'>
      <span className='text-muted-foreground'>{label}</span>
      {value ? (
        <span className='flex items-center gap-1 text-green-600'>
          <CheckCircle2 size={16} />
          <span>Yes</span>
        </span>
      ) : (
        <span className='flex items-center gap-1 text-red-500'>
          <XCircle size={16} />
          <span>No</span>
        </span>
      )}
    </div>
  )

  return (
    <Card className='bg-card rounded-2xl border shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
        <Badge
          variant={verified ? 'default' : 'outline'}
          className='flex items-center gap-1'
        >
          {!verified ? <Clock size={14} /> : <CheckCircle2 size={14} />}
          {verified ? 'Verified' : 'Pending'}
        </Badge>
      </CardHeader>
      <CardContent className='space-y-2'>
        {renderStatus('Submitted', submitted)}
        {renderStatus('Paid', paid)}
        {renderStatus('Verified', verified)}
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

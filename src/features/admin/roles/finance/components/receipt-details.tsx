import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowLeft, Edit } from 'lucide-react'
import { DeleteReceiptBtn } from './delete-receipt-btn'

import type { TReceipt } from '@/types/receipt'

import { useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'

export const ReceiptDetails = ({ data: receipt }: { data: TReceipt }) => {
  const navigate = useNavigate()

  const totalAmount = receipt.data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Receipt Details</CardTitle>
        <CardDescription>ID: {receipt.id}</CardDescription>
        <CardAction className='space-x-2'>
          <Button
            size={'icon'}
            variant={'secondary'}
            onClick={() =>
              navigate({
                to: '/admin/receipts/$id/update',
                params: { id: receipt.id.toString() },
              })
            }
          >
            <Edit />
          </Button>
          <DeleteReceiptBtn id={receipt.id.toString()} />
        </CardAction>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <p>
            <span className='text-muted-foreground font-medium'>Year:</span>{' '}
            {receipt.year}
          </p>
          <p>
            <span className='text-muted-foreground font-medium'>
              Created At:
            </span>{' '}
            {format(receipt.createdAt, 'MMM dd, yyyy, h:mm a')}
          </p>
          <p>
            <span className='text-muted-foreground font-medium'>
              Updated At:
            </span>{' '}
            {receipt.updatedAt
              ? new Date(receipt.updatedAt).toLocaleString()
              : '—'}
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receipt.data.length > 0 ? (
              receipt.data.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className='text-right'>
                    {item.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className='text-muted-foreground text-center'
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className='mt-4 flex justify-end'>
          <p className='text-base font-semibold'>
            Total:{' '}
            <span className='text-foreground'>
              {totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
      </CardContent>

      <CardFooter className='flex justify-end'>
        <Button
          variant='secondary'
          onClick={() => navigate({ to: '..' })}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back
        </Button>
      </CardFooter>
    </Card>
  )
}

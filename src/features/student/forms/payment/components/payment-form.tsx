import { DropPhoto } from '@/components/drop-photo'
import { Stamp } from '@/components/stamp'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

import type { TDropPhoto } from '@/components/drop-photo'
import type { TForm } from '@/types/form'
import type { TReceipt } from '@/types/receipt'

import { useRef, useState } from 'react'
import { useUploadPayment } from '../api/upload-payment.api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const PaymentForm = ({
  formDetails,
  paymentDetails,
  onSuccess,
}: {
  formDetails: TForm
  paymentDetails: TReceipt
  onSuccess: () => void
}) => {
  const paymentRef = useRef<TDropPhoto>(null)

  const [screenshot, setScreenshot] = useState<File>()

  const { mutate, isPending } = useUploadPayment({ onSuccess })

  const handleSubmit = () => {
    if (screenshot) mutate(screenshot)
  }

  const totalAmount = paymentDetails.data.reduce(
    (sum, item) => sum + item.amount,
    0,
  )

  return (
    <Card className='relative container mx-auto max-w-3xl'>
      <CardHeader className='text-center'>
        <CardTitle className='leading-6'>နည်းပညာတက္ကသိုလ်(တောင်ကြီး)</CardTitle>
        <CardDescription className='text-card-foreground leading-6'>
          ({formDetails.academicYear})ပညာသင်နှစ်
        </CardDescription>
        <CardTitle className='leading-6'>Payment</CardTitle>
        <Stamp
          url={formDetails.stampUrl}
          id={formDetails.id.toString()}
          className='absolute top-2 left-2'
        />
      </CardHeader>
      <CardContent className='space-y-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentDetails.data.length > 0 ? (
              paymentDetails.data.map((item, i) => (
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

        <DropPhoto
          ref={paymentRef}
          onDrop={setScreenshot}
          photoName='Screenshot'
        />
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button
          disabled={!screenshot}
          onClick={handleSubmit}
        >
          Submit {isPending && <Spinner />}
        </Button>
      </CardFooter>
    </Card>
  )
}

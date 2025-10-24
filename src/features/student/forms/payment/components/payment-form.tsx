import { FormCardHeader } from '@/components/common/form-card-header'
import { DropPhoto } from '@/components/drop-photo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'

import type { TDropPhoto } from '@/components/drop-photo'
import type { TForm } from '@/types/form'
import type { TReceipt } from '@/types/receipt'

import { useRef, useState } from 'react'

import { useUploadPayment } from '../api/upload-payment.api'

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

  const [screenshot, setScreenshot] = useState<File | null>()

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
      <FormCardHeader
        form={formDetails}
        title='Payment'
      />
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

        <div className='mt-2 flex justify-center'>
          <Button
            variant={'destructive'}
            onClick={() => {
              paymentRef.current?.remove()
              setScreenshot(null)
            }}
            disabled={!screenshot}
          >
            Remove <Trash2 />
          </Button>
        </div>
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

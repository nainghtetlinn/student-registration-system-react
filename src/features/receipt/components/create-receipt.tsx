import { BackBtn } from '@/components/common/back-btn'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { FormSelectField } from '@/components/ui/form-fields'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TicketPlus, Trash2 } from 'lucide-react'
import { AddData } from './add-data'

import type { TReceiptSchema } from '../schema/receipt.schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { FINANCE_RECEIPT_YEARS } from '@/lib/constants'
import { useCreateReceipt } from '../api/create-receipt.api'
import { receiptSchema } from '../schema/receipt.schema'

export const CreateReceipt = () => {
  const form = useForm({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      year: '',
      data: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'data',
  })

  const { mutate, isPending } = useCreateReceipt({
    onSuccess: () => {
      form.reset()
    },
  })

  const onSubmit = (data: TReceiptSchema) => {
    mutate(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-lg'
      >
        <Card className='border-none'>
          <CardHeader className='flex flex-col items-center gap-2 text-center'>
            <CardTitle className='text-2xl font-bold'>
              Create new receipt
            </CardTitle>
            <CardDescription className='text-muted-foreground text-sm text-balance'>
              Select year, and data to create receipt
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <FormSelectField
              control={form.control}
              name='year'
              items={FINANCE_RECEIPT_YEARS}
              keyExtractor={(y) => y.value}
              labelExtractor={(y) => y.name}
              placeholder='Year'
              label='Year'
              hideErrorMessage
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.length > 0 ? (
                  fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>{field.name}</TableCell>
                      <TableCell>{field.amount as string}</TableCell>
                      <TableCell className='w-9'>
                        <Button
                          size='icon'
                          variant='destructive'
                          type='button'
                          onClick={() => remove(index)}
                        >
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className='text-muted-foreground text-center text-sm'
                    >
                      No data added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <AddData append={append} />
          </CardContent>
          <CardFooter className='flex justify-end gap-2'>
            <BackBtn />
            <Button disabled={isPending}>
              Save {isPending ? <Spinner /> : <TicketPlus />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

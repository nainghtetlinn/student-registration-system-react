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
import { FormInputField, FormSelectField } from '@/components/ui/form-fields'
import { Spinner } from '@/components/ui/spinner'
import { TicketPlus, Trash2 } from 'lucide-react'

import type { TReceiptSchema } from '../schema/receipt.schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import { useCreateReceipt } from '../api/create-receipt.api'
import { dataSchema, receiptSchema } from '../schema/receipt.schema'

export const CreateReceipt = () => {
  const form = useForm({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      year: '',
      data: [],
    },
  })

  const dataForm = useForm({
    resolver: zodResolver(dataSchema),
    defaultValues: {
      name: '',
      amount: '',
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

  const [open, setOpen] = useState(false)

  const onSubmit = (data: TReceiptSchema) => {
    mutate(data)
  }

  const handleAdd = async () => {
    const isValid = await dataForm.trigger()
    if (!isValid) return

    const data = dataForm.getValues()
    append(data)
    dataForm.reset()
    setOpen(false)
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
              items={[
                'FIRST_YEAR',
                'SECOND_YEAR',
                'THIRD_YEAR',
                'FOURTH_YEAR',
                'FIFTH_YEAR',
                'SIXTH_YEAR',
              ]}
              keyExtractor={(y) => y}
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

            <Dialog
              open={open}
              onOpenChange={setOpen}
            >
              <DialogTrigger asChild>
                <Button type='button'>Add Data</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Add Data</DialogTitle>
                <Form {...dataForm}>
                  <div className='space-y-4'>
                    <FormInputField
                      control={dataForm.control}
                      name='name'
                      label='Name'
                    />
                    <FormInputField
                      control={dataForm.control}
                      name='amount'
                      label='Amount'
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type='button'
                      variant={'secondary'}
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='button'
                      onClick={handleAdd}
                    >
                      Add
                    </Button>
                  </DialogFooter>
                </Form>
              </DialogContent>
            </Dialog>
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button disabled={isPending}>
              Save {isPending ? <Spinner /> : <TicketPlus />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

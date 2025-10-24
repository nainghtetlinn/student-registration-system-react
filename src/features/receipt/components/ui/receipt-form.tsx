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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
import { Trash2 } from 'lucide-react'
import { AddData } from './add-data'
import { AddPhone } from './add-phone'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { receiptSchema, type TReceiptSchema } from '../../schema/receipt.schema'

export const ReceiptForm = ({
  title,
  description,
  isPending,
  defaultValues,
  onSubmit,
}: {
  title: string
  description: string
  isPending: boolean
  defaultValues: TReceiptSchema
  onSubmit: (data: TReceiptSchema) => void
}) => {
  const form = useForm({
    resolver: zodResolver(receiptSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'data',
  })

  const {
    fields: phones,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: form.control,
    name: 'phoneNumbers',
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-lg'
      >
        <Card className='border-none'>
          <CardHeader className='flex flex-col items-center gap-2 text-center'>
            <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
            <CardDescription className='text-muted-foreground text-sm text-balance'>
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-6'>
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

            <FormField
              control={form.control}
              name='data'
              render={() => (
                <FormItem>
                  <FormLabel>Receipt Items</FormLabel>
                  <FormControl>
                    <Table>
                      <TableHeader>
                        <TableRow className='hover:bg-transparent'>
                          <TableHead className='w-[59px]'>No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className='w-[59px]'>
                            <AddData append={append} />
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fields.length > 0 ? (
                          fields.map((field, index) => (
                            <TableRow key={field.id}>
                              <TableCell>{index + 1}.</TableCell>
                              <TableCell>{field.name}</TableCell>
                              <TableCell>{field.amount as string}</TableCell>
                              <TableCell>
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
                              colSpan={4}
                              className='text-muted-foreground text-center text-sm'
                            >
                              No data added yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phoneNumbers'
              render={() => (
                <FormItem>
                  <FormLabel>Phone Numbers</FormLabel>
                  <FormControl>
                    <Table>
                      <TableHeader>
                        <TableRow className='hover:bg-transparent'>
                          <TableHead className='w-[59px]'>No.</TableHead>
                          <TableHead>Phone No.</TableHead>
                          <TableHead className='w-[59px]'>
                            <AddPhone append={appendPhone} />
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {phones.length > 0 ? (
                          phones.map((field, index) => (
                            <TableRow key={field.id}>
                              <TableCell>{index + 1}.</TableCell>
                              <TableCell>{field.phoneNumber}</TableCell>
                              <TableCell>
                                <Button
                                  size='icon'
                                  variant='destructive'
                                  type='button'
                                  onClick={() => removePhone(index)}
                                >
                                  <Trash2 />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className='text-muted-foreground text-center text-sm'
                            >
                              No phone number added yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='flex justify-end gap-2'>
            <BackBtn />
            <Button disabled={isPending}>
              Save {isPending && <Spinner />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

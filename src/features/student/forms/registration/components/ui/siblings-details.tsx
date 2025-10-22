import { Button } from '@/components/ui/button'
import { FormCheckboxField } from '@/components/ui/form-fields'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import { AddSibling } from './add-sibling'

import type { TRegistrationFormSchema } from '../../schema/registration-form.schema'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { nrcObjectToString } from '@/lib/utils'

export const SiblingsDetails = () => {
  const form = useFormContext<TRegistrationFormSchema>()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'siblings',
  })

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>
        ညီအကိုမောင်နှမများ
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>NRC</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Address</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>{field.name}</TableCell>
                <TableCell>{nrcObjectToString(field.nrc)}</TableCell>
                <TableCell>{field.job}</TableCell>
                <TableCell>{field.address}</TableCell>
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
                colSpan={5}
                className='text-muted-foreground text-center text-sm'
              >
                No Sibling
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AddSibling append={append} />

      <FormCheckboxField
        control={form.control}
        name='acknowledged'
        label='အထက်ပါအချက်များမှန်ကန်ကြောင်းတာဝန်ယူပါသည်။'
      />
    </div>
  )
}

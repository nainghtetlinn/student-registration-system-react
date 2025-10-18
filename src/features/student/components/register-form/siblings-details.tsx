import { NrcInput } from '@/components/nrc-input'
import { Button } from '@/components/ui/button'
import { FormInputField } from '@/components/ui/form-fields'
import { Trash2 } from 'lucide-react'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { nrcDefaults } from '@/lib/schema'
import { type TRegisterFormSchema } from '../../schemas/register-form-schema'

export const SiblingsDetails = () => {
  const form = useFormContext<TRegisterFormSchema>()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'siblings',
  })

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>
        ညီအကိုမောင်နှမများ
      </h2>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className='flex flex-col gap-2'
        >
          <div className='flex items-center justify-between'>
            <p>Sibling {index + 1}</p>
            <Button
              type='button'
              size='icon'
              variant='ghost'
              onClick={() => remove(index)}
            >
              <Trash2 />
            </Button>
          </div>
          <FormInputField
            control={form.control}
            name={`siblings.${index}.name`}
            placeholder='အမည်'
          />
          <NrcInput
            control={form.control}
            stateCodeName={`siblings.${index}.nrc.stateCode`}
            townshipCodeName={`siblings.${index}.nrc.townshipCode`}
            nrcTypeName={`siblings.${index}.nrc.nrcType`}
            nrcNumberName={`siblings.${index}.nrc.nrcNumber`}
          />
          <FormInputField
            control={form.control}
            name={`siblings.${index}.job`}
            placeholder='အလုပ်အကိုင်'
          />
          <FormInputField
            control={form.control}
            name={`siblings.${index}.address`}
            placeholder='နေရပ်လိပ်စာ'
          />
        </div>
      ))}

      {fields.length === 0 && (
        <p className='rounded border py-4 text-center'>No Siblings.</p>
      )}

      <Button
        type='button'
        className='w-full'
        onClick={() =>
          append({ name: '', nrc: nrcDefaults, job: '', address: '' })
        }
      >
        Add Sibling
      </Button>
    </div>
  )
}

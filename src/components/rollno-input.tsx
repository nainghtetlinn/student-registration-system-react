import { FormInputField, FormSelectField } from '@/components/ui/form-fields'
import { Label } from '@radix-ui/react-label'

import {
  useFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

export const RollNoInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  control,
  yearName,
  majorName,
  noName,
}: {
  label: string
  control: Control<TFieldValues>
  yearName: TName
  majorName: TName
  noName: TName
}) => {
  const form = useFormContext()

  const yearField = form.getFieldState(yearName, form.formState)
  const majorField = form.getFieldState(majorName, form.formState)
  const noField = form.getFieldState(noName, form.formState)

  return (
    <div className='grid gap-2'>
      <Label
        data-error={!!yearField.error || !!majorField.error || !!noField.error}
        className='data-[error=true]:text-destructive flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
      >
        {label}
      </Label>

      <div className='flex items-center gap-1'>
        <FormSelectField
          control={control}
          name={yearName}
          hideErrorMessage
          placeholder='Year'
          items={[
            { key: '1' },
            { key: '2' },
            { key: '3' },
            { key: '4' },
            { key: '5' },
            { key: '6' },
          ]}
          keyExtractor={(item) => item.key}
        />
        <FormSelectField
          control={control}
          name={majorName}
          hideErrorMessage
          placeholder='Major'
          items={[
            { key: 'CIVIL' },
            { key: 'EC' },
            { key: 'EP' },
            { key: 'MECH' },
            { key: 'CEIT' },
            { key: 'MN' },
          ]}
          keyExtractor={(item) => item.key}
        />
        <FormInputField
          control={control}
          name={noName}
          hideErrorMessage
          placeholder='No.'
        />
      </div>
    </div>
  )
}

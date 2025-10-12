import { MAJORS } from '@/lib/constants'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export const MajorSelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
}: {
  control: Control<TFieldValues>
  name: TName
  label: string
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex items-center gap-2'>
          <FormLabel>{label}</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={'Major'} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {MAJORS.map((m) => {
                return (
                  <SelectItem
                    key={m.id}
                    value={m.id.toString()}
                  >
                    {m.name.en}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}

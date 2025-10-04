import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'

import { type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { useState } from 'react'

export const DobPicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  hideErrorMessage = false,
}: {
  control: Control<TFieldValues>
  name: TName
  hideErrorMessage?: boolean
}) => {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>မွေးသက္ကရာဇ်</FormLabel>
          <Popover
            open={open}
            onOpenChange={setOpen}
          >
            <FormControl>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-48 justify-between font-normal'
                >
                  {field.value
                    ? field.value.toLocaleDateString()
                    : 'Select date'}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
            </FormControl>
            <PopoverContent
              className='w-auto overflow-hidden p-0'
              align='start'
            >
              <Calendar
                mode='single'
                captionLayout='dropdown'
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date)
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
          {!hideErrorMessage && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

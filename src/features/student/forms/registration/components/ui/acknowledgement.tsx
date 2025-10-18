import { DropPhoto } from '@/components/drop-photo'
import { Button } from '@/components/ui/button'
import { FormCheckboxField } from '@/components/ui/form-fields'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'

import type { TDropPhoto } from '@/components/drop-photo'
import type { TRegistrationFormSchema } from '../../schema/registration-form.schema'

import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'

export const Acknowledgement = () => {
  const photoRef = useRef<TDropPhoto>(null)
  const signRef = useRef<TDropPhoto>(null)
  const parentSignRef = useRef<TDropPhoto>(null)
  const form = useFormContext<TRegistrationFormSchema>()

  const onDrop = (file: File) => {
    console.log(file)
  }

  return (
    <div className='min-h-[550px] space-y-4'>
      <section>
        <div className='mb-2 flex items-center justify-between'>
          <Label htmlFor='photo'>ဓာတ်ပုံ</Label>
          <Button
            variant={'destructive'}
            size={'icon'}
            onClick={photoRef.current?.remove}
          >
            <Trash2 />
          </Button>
        </div>
        <DropPhoto
          ref={photoRef}
          onDrop={onDrop}
        />
      </section>

      <section>
        <div className='mb-2 flex items-center justify-between'>
          <Label>မှတ်ပုံတင်ခွင့်တောင်းသူလက်မှတ်</Label>
          <Button
            variant={'destructive'}
            size={'icon'}
            onClick={signRef.current?.remove}
          >
            <Trash2 />
          </Button>
        </div>

        <DropPhoto
          ref={signRef}
          onDrop={onDrop}
        />
      </section>

      <section className='space-y-4'>
        <div>
          <Label className='leading-8'>အဘ/အမိ/အုပ်ထိန်းသူအမည်</Label>
          <Input />
        </div>
        <div className='mb-2 flex items-center justify-between'>
          <Label>အဘ/အမိ/အုပ်ထိန်းသူလက်မှတ်</Label>
          <Button
            variant={'destructive'}
            size={'icon'}
            onClick={parentSignRef.current?.remove}
          >
            <Trash2 />
          </Button>
        </div>

        <DropPhoto
          ref={parentSignRef}
          onDrop={onDrop}
        />
      </section>

      <FormCheckboxField
        control={form.control}
        name='acknowledged'
        label='အထက်ပါအချက်များမှန်ကန်ကြောင်းတာဝန်ယူပါသည်။'
      />
    </div>
  )
}

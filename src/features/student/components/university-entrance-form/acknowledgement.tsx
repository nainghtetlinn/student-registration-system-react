import { DropPhoto, type TDropPhoto } from '@/components/drop-photo'
import { Button } from '@/components/ui/button'
import { FormCheckboxField } from '@/components/ui/form-fields'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'

import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { type TUniversityEntranceFormSchema } from '../../schemas/university-entrance-form-schema'

export const Acknowledgement = () => {
  const photoRef = useRef<TDropPhoto>(null)
  const signRef = useRef<TDropPhoto>(null)
  const form = useFormContext<TUniversityEntranceFormSchema>()

  const onDrop = (file: File) => {
    console.log(file)
  }

  return (
    <div className='flex min-h-[550px] flex-col gap-4'>
      <section>
        <div className='mb-1 flex items-center justify-between'>
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
          <Label>လက်မှတ်</Label>
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

      <FormCheckboxField
        control={form.control}
        name='acknowledged'
        label='ကတိခံဝန်ချက် - တက္ကသိုလ်မှ သတ်မှတ်ထားသောစည်းကမ်းများကိုလိုက်နာပါမည်။'
      />
    </div>
  )
}

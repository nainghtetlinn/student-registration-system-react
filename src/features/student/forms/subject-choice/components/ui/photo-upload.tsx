import { DropPhoto, type TDropPhoto } from '@/components/drop-photo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'

import { useRef } from 'react'

export const PhotoUpload = () => {
  const photoRef = useRef<TDropPhoto>(null)
  const studentSignRef = useRef<TDropPhoto>(null)
  const parentSignRef = useRef<TDropPhoto>(null)

  const onDrop = (file: File) => {
    console.log(file)
  }

  return (
    <div className='min-h-[550px] space-y-6'>
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

      <section className='space-y-2'>
        <div>
          <Label className='leading-8'>ဝင်ခွင့်လျှောက်ထားသူအမည်</Label>
          <Input />
        </div>
        <div className='mb-2 flex items-center justify-between'>
          <Label>ဝင်ခွင့်လျှောက်ထားသူလက်မှတ်</Label>
          <Button
            variant={'destructive'}
            size={'icon'}
            onClick={studentSignRef.current?.remove}
          >
            <Trash2 />
          </Button>
        </div>

        <DropPhoto
          ref={studentSignRef}
          onDrop={onDrop}
        />
      </section>

      <section className='space-y-2'>
        <div>
          <Label className='leading-8'>မိဘ(သို့မဟုတ်)အုပ်ထိန်းသူအမည်</Label>
          <Input />
        </div>
        <div className='mb-2 flex items-center justify-between'>
          <Label>မိဘ(သို့မဟုတ်)အုပ်ထိန်းသူ၏လက်မှတ်</Label>
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
    </div>
  )
}

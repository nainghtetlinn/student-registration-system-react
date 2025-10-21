import { FormCardHeader } from '@/components/common/form-card-header'
import { DropPhoto } from '@/components/drop-photo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Trash2 } from 'lucide-react'

import type { TDropPhoto } from '@/components/drop-photo'
import type { TForm } from '@/types/form'

import { useRef, useState } from 'react'

import { useUploadPhoto } from '../api/upload-photo.api'
import { useUploadSignature } from '../api/upload-signature.api'

export const UploadFilesForm = ({
  formDetails,
  onSuccess,
}: {
  formDetails: TForm
  onSuccess: () => void
}) => {
  const [photo, setPhoto] = useState<File | null>(null)
  const [sign, setSign] = useState<File | null>(null)

  const photoRef = useRef<TDropPhoto>(null)
  const signRef = useRef<TDropPhoto>(null)

  const photoMutation = useUploadPhoto({
    onSuccess: () => {
      if (sign) signatureMutation.mutate(sign)
    },
    onError: () => {
      console.log('Photo Error')
    },
  })
  const signatureMutation = useUploadSignature({
    onSuccess,
    onError: () => {
      console.log('Signature Error')
    },
  })

  const handleSubmit = () => {
    if (photo) photoMutation.mutate(photo)
  }

  return (
    <Card className='relative container mx-auto max-w-3xl'>
      <FormCardHeader
        form={formDetails}
        title='တက္ကသိုလ်ဝင်ခွင့်လျှောက်လွှာ'
      />
      <CardContent className='space-y-4'>
        <section>
          <Label className='leading-8'>ဓာတ်ပုံ</Label>
          <DropPhoto
            ref={photoRef}
            photoName='Photo'
            onDrop={setPhoto}
          />
          <div className='mt-2 flex justify-center'>
            <Button
              variant={'destructive'}
              onClick={() => {
                photoRef.current?.remove()
                setPhoto(null)
              }}
              disabled={!photo}
            >
              Remove <Trash2 />
            </Button>
          </div>
        </section>

        <section>
          <Label className='leading-8'>လက်မှတ်</Label>
          <DropPhoto
            ref={signRef}
            photoName='Signature'
            onDrop={setSign}
          />
          <div className='mt-2 flex justify-center'>
            <Button
              variant={'destructive'}
              onClick={() => {
                signRef.current?.remove()
                setSign(null)
              }}
              disabled={!sign}
            >
              Remove <Trash2 />
            </Button>
          </div>
        </section>
      </CardContent>
      <CardFooter className='flex items-center justify-end gap-2'>
        <Button
          disabled={
            !photo ||
            !sign ||
            photoMutation.isPending ||
            signatureMutation.isPending
          }
          onClick={handleSubmit}
        >
          Submit{' '}
          {photoMutation.isPending || signatureMutation.isPending ? (
            <Spinner />
          ) : null}
        </Button>
      </CardFooter>
    </Card>
  )
}

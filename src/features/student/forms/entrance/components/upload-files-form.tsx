import { DropPhoto } from '@/components/drop-photo'
import { Stamp } from '@/components/stamp'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Trash2 } from 'lucide-react'

import type { TDropPhoto } from '@/components/drop-photo'
import type { TForm } from '@/types/form'

import { useEffect, useRef, useState } from 'react'

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

  const [successCount, setSuccessCount] = useState(0)

  const photoMutation = useUploadPhoto({
    onSuccess: () => {
      setSuccessCount((prev) => prev + 1)
    },
    onError: () => {
      console.log('Photo Error')
    },
  })
  const signatureMutation = useUploadSignature({
    onSuccess: () => {
      setSuccessCount((prev) => prev + 1)
    },
    onError: () => {
      console.log('Signature Error')
    },
  })

  const handleSubmit = () => {
    if (photo) photoMutation.mutate(photo)
    if (sign) signatureMutation.mutate(sign)
  }

  useEffect(() => {
    if (successCount === 2) {
      onSuccess()
    }
  }, [successCount])

  return (
    <Card className='relative container mx-auto max-w-3xl'>
      <CardHeader className='text-center'>
        <CardTitle className='leading-6'>နည်းပညာတက္ကသိုလ်(တောင်ကြီး)</CardTitle>
        <CardDescription className='text-card-foreground leading-6'>
          ({formDetails.academicYear})ပညာသင်နှစ်
        </CardDescription>
        <CardTitle className='leading-6'>
          တက္ကသိုလ်ဝင်ခွင့်လျှောက်လွှာ
        </CardTitle>
        <Stamp
          url={formDetails.stampUrl}
          id={formDetails.id.toString()}
          className='absolute top-2 left-2'
        />
      </CardHeader>
      <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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

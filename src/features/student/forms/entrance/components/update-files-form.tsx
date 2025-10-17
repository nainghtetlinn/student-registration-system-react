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
import { Edit2, Trash2 } from 'lucide-react'

import type { TDropPhoto } from '@/components/drop-photo'
import type { TForm } from '@/types/form'
import type { TFiles } from '../types/get.type'

import { useRef, useState } from 'react'

import { useGetFile } from '../api/get-file.api'
import { useUploadPhoto } from '../api/upload-photo.api'
import { useUploadSignature } from '../api/upload-signature.api'

export const UpdateFilesForm = ({
  formDetails,
  files,
  onSuccess,
}: {
  formDetails: TForm
  files: TFiles
  onSuccess: () => void
}) => {
  const { fileUrl: photoUrl } = useGetFile(
    files.studentPhotoUrl,
    'Profile Photo',
  )
  const { fileUrl: signUrl } = useGetFile(
    files.studentSignatureUrl,
    'Signature',
  )

  const [isPhotoEdit, setIsPhotoEdit] = useState(false)
  const [isSignEdit, setIsSignEdit] = useState(false)

  const [photo, setPhoto] = useState<File | null>(null)
  const [sign, setSign] = useState<File | null>(null)

  const photoRef = useRef<TDropPhoto>(null)
  const signRef = useRef<TDropPhoto>(null)

  const photoMutation = useUploadPhoto({
    onSuccess,
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
    if (sign) signatureMutation.mutate(sign)
    if (!photo && !sign) onSuccess()
  }

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
          {isPhotoEdit && (
            <>
              <DropPhoto
                ref={photoRef}
                photoName='Photo'
                onDrop={setPhoto}
              />
              <div className='mt-2 flex justify-center gap-2'>
                <Button onClick={() => setIsPhotoEdit(false)}>Cancel</Button>
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
            </>
          )}
          {!isPhotoEdit && (
            <>
              <img
                src={photoUrl!}
                alt='Profile Photo'
                className='h-[200px] w-full rounded object-contain'
              />
              <div className='mt-2 flex justify-center'>
                <Button onClick={() => setIsPhotoEdit(true)}>
                  Edit <Edit2 />
                </Button>
              </div>
            </>
          )}
        </section>
        <section>
          <Label className='leading-8'>လက်မှတ်</Label>
          {isSignEdit && (
            <>
              <DropPhoto
                ref={signRef}
                photoName='Signature'
                onDrop={setSign}
              />
              <div className='mt-2 flex justify-center gap-2'>
                <Button onClick={() => setIsSignEdit(false)}>Cancel</Button>
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
            </>
          )}
          {!isSignEdit && (
            <>
              <img
                src={signUrl!}
                alt='Signature'
                className='h-[200px] w-full rounded object-contain'
              />
              <div className='mt-2 flex justify-center'>
                <Button onClick={() => setIsSignEdit(true)}>
                  Edit <Edit2 />
                </Button>
              </div>
            </>
          )}
        </section>
      </CardContent>
      <CardFooter className='flex items-center justify-end gap-2'>
        <Button
          disabled={photoMutation.isPending || signatureMutation.isPending}
          onClick={handleSubmit}
        >
          Save
          {photoMutation.isPending || signatureMutation.isPending ? (
            <Spinner />
          ) : null}
        </Button>
      </CardFooter>
    </Card>
  )
}

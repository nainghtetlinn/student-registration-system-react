import { FormCardHeader } from '@/components/common/form-card-header'
import { DropPhoto } from '@/components/drop-photo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Trash2 } from 'lucide-react'

import type { TDropPhoto } from '@/components/drop-photo'
import type { TForm } from '@/types/form'

import { useRef, useState } from 'react'

import {
  useUploadGuardianSignature,
  useUploadStudentSignature,
} from '../api/upload-signature.api'

export const UploadFilesForm = ({
  formDetails,
  onSuccess,
}: {
  formDetails: TForm
  onSuccess: () => void
}) => {
  const [studentSign, setStudentSign] = useState<File | null>(null)
  const [guardianSign, setGuardianSign] = useState<File | null>(null)
  const [guardianName, setGuardianName] = useState('')

  const studentSignRef = useRef<TDropPhoto>(null)
  const guardianSignRef = useRef<TDropPhoto>(null)

  const studentSignMutation = useUploadStudentSignature({
    onSuccess: () => {
      if (guardianSign && guardianName)
        guardianSignMutation.mutate({ file: guardianSign, name: guardianName })
    },
    onError: () => {
      console.log('Student Sign Error')
    },
  })
  const guardianSignMutation = useUploadGuardianSignature({
    onSuccess,
    onError: () => {
      console.log('Guardian Sign Error')
    },
  })

  const handleSubmit = () => {
    if (studentSign) studentSignMutation.mutate(studentSign)
  }

  return (
    <Card className='relative container mx-auto max-w-3xl'>
      <FormCardHeader
        form={formDetails}
        title='ကျောင်းသားမှတ်ပုံတင်ခွင့်လျှောက်လွှာ'
      />
      <CardContent className='space-y-4'>
        <section className='space-y-2'>
          <div>
            <Label className='leading-8'>ဝင်ခွင့်လျှောက်ထားသူလက်မှတ်</Label>
            <DropPhoto
              ref={studentSignRef}
              onDrop={setStudentSign}
              photoName='Signature'
            />
            <div className='mt-2 flex justify-center'>
              <Button
                variant={'destructive'}
                onClick={() => {
                  studentSignRef.current?.remove()
                  setStudentSign(null)
                }}
                disabled={!studentSign}
              >
                Remove <Trash2 />
              </Button>
            </div>
          </div>
        </section>
        <section className='space-y-2'>
          <div>
            <Label className='leading-8'>မိဘ(သို့မဟုတ်)အုပ်ထိန်းသူအမည်</Label>
            <Input
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
            />
          </div>
          <div>
            <Label className='leading-8'>
              မိဘ(သို့မဟုတ်)အုပ်ထိန်းသူ၏လက်မှတ်
            </Label>
            <DropPhoto
              ref={guardianSignRef}
              onDrop={setGuardianSign}
              photoName='Signature'
            />
          </div>
          <div className='mt-2 flex justify-center'>
            <Button
              variant={'destructive'}
              onClick={() => {
                guardianSignRef.current?.remove()
                setGuardianSign(null)
              }}
              disabled={!guardianSign}
            >
              Remove <Trash2 />
            </Button>
          </div>
        </section>
      </CardContent>
      <CardFooter className='flex items-center justify-end gap-2'>
        <Button
          disabled={
            !studentSign ||
            !guardianSign ||
            !guardianName ||
            studentSignMutation.isPending ||
            guardianSignMutation.isPending
          }
          onClick={handleSubmit}
        >
          Submit{' '}
          {studentSignMutation.isPending || guardianSignMutation.isPending ? (
            <Spinner />
          ) : null}
        </Button>
      </CardFooter>
    </Card>
  )
}

import { FormCardHeader } from '@/components/common/form-card-header'
import { DropPhoto } from '@/components/drop-photo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Edit2, Trash2 } from 'lucide-react'

import type { TDropPhoto } from '@/components/drop-photo'
import type { TForm } from '@/types/form'
import type { TFiles } from '../types/get.type'

import { useRef, useState } from 'react'

import { useGetFile } from '../api/get-file.api'
import {
  useUploadGuardianSignature,
  useUploadStudentSignature,
} from '../api/upload-signature.api'

export const UpdateFilesForm = ({
  formDetails,
  studentName,
  files,
  onSuccess,
}: {
  formDetails: TForm
  studentName: string
  files: TFiles
  onSuccess: () => void
}) => {
  const { fileUrl: studentSignUrl } = useGetFile(
    files.studentSignatureUrl,
    'Student Signature',
  )
  const { fileUrl: guardianSignUrl } = useGetFile(
    files.guardianSginatureUrl,
    'Guardian Signature',
  )

  const [isStudentSignEdit, setIsStudentSignEdit] = useState(false)
  const [isGuardianSignEdit, setIsGuardianSignEdit] = useState(false)

  const [studentSign, setStudentSign] = useState<File | null>(null)
  const [guardianSign, setGuardianSign] = useState<File | null>(null)
  const [guardianName, setGuardianName] = useState(files.guardianName || '')

  const studentSignRef = useRef<TDropPhoto>(null)
  const guardianSignRef = useRef<TDropPhoto>(null)

  const studentSignMutation = useUploadStudentSignature({
    onSuccess,
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
    if (guardianSign && guardianName)
      guardianSignMutation.mutate({ file: guardianSign, name: guardianName })
    if (!studentSign && !guardianSign && guardianName === files.guardianName)
      onSuccess()
  }

  return (
    <Card className='relative container mx-auto max-w-3xl'>
      <FormCardHeader
        form={formDetails}
        title='အထူးပြုဘာသာရပ်ရွေးချယ်ခွင့်လျှောက်လွှာ'
      />
      <CardContent className='space-y-4'>
        <section className='space-y-2'>
          <div>
            <Label className='leading-8'>ဝင်ခွင့်လျှောက်ထားသူအမည်</Label>
            <Input
              disabled
              value={studentName}
            />
          </div>
          <div>
            <Label className='leading-8'>ဝင်ခွင့်လျှောက်ထားသူလက်မှတ်</Label>
            {isStudentSignEdit && (
              <>
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
              </>
            )}
            {!isStudentSignEdit && (
              <>
                <img
                  src={studentSignUrl!}
                  alt='Student Signature'
                  className='h-[200px] w-full rounded object-contain'
                />
                <div className='mt-2 flex justify-center gap-2'>
                  <Button onClick={() => setIsStudentSignEdit(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsStudentSignEdit(true)}>
                    Edit <Edit2 />
                  </Button>
                </div>
              </>
            )}
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
            {isGuardianSignEdit && (
              <>
                <DropPhoto
                  ref={guardianSignRef}
                  onDrop={setGuardianSign}
                  photoName='Signature'
                />
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
              </>
            )}
            {!isGuardianSignEdit && (
              <>
                <img
                  src={guardianSignUrl!}
                  alt='Guardian Signature'
                  className='h-[200px] w-full rounded object-contain'
                />
                <div className='mt-2 flex justify-center gap-2'>
                  <Button onClick={() => setIsGuardianSignEdit(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsGuardianSignEdit(true)}>
                    Edit <Edit2 />
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </CardContent>
      <CardFooter className='flex items-center justify-end gap-2'>
        <Button
          disabled={
            studentSignMutation.isPending || guardianSignMutation.isPending
          }
          onClick={handleSubmit}
        >
          Save{' '}
          {studentSignMutation.isPending || guardianSignMutation.isPending ? (
            <Spinner />
          ) : null}
        </Button>
      </CardFooter>
    </Card>
  )
}

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, Upload } from 'lucide-react'
import Dropzone from 'react-dropzone'

import { imageSchema, useUploadProfile } from '@/api/profile/upload-file'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'

export const UploadProfilePhoto = () => {
  const [fileLoading, setFileLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileLocalUrl, setFileLocalUrl] = useState('')

  const { mutate, isPending } = useUploadProfile()

  const handleDrop = async (acceptedFiles: File[]) => {
    setFileLoading(true)
    const image = acceptedFiles[0]
    setFile(image)
    setFileLocalUrl(URL.createObjectURL(image))
    setFileLoading(false)
  }

  const handleRemove = () => {
    setFile(null)
    setFileLocalUrl('')
  }

  const handleUpload = () => {
    if (!file) return toast.error('Please select a file')
    const result = imageSchema.safeParse(file)

    if (!result.success) return console.log(result.error)

    mutate(result.data)
  }

  return (
    <Dialog
      onOpenChange={(s) => {
        if (!s) handleRemove()
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant='secondary'
          size='icon'
        >
          <Upload />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Profile Photo</DialogTitle>
        </DialogHeader>
        <div>
          {fileLoading ? (
            <Skeleton className='h-[150px] w-full' />
          ) : file === null ? (
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div {...getRootProps()}>
                  <input
                    {...getInputProps()}
                    accept='image/*'
                  />
                  <div
                    className={cn(
                      'bg-background border-primary flex h-[150px] w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed',
                      isDragActive && 'bg-primary/30',
                    )}
                  >
                    <div>
                      <Upload
                        size={40}
                        className='mx-auto'
                      />
                      <p className='text-center font-bold'>
                        Drag & drop to upload image
                      </p>
                      <p className='text-primary text-center text-sm underline'>
                        or browse
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>
          ) : (
            <Avatar className='mx-auto h-[150px] w-[150px]'>
              <AvatarImage src={fileLocalUrl} />
            </Avatar>
          )}
        </div>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={handleUpload}
          >
            Upload{' '}
            {isPending ? <Loader2 className='animate-spin' /> : <Upload />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

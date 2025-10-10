import { Upload } from 'lucide-react'

import { useImperativeHandle, useState, type Ref } from 'react'
import Dropzone from 'react-dropzone'

import { cn } from '@/lib/utils'

export type TDropPhoto = { remove: () => void; get: () => File | null }

export const DropPhoto = ({
  photoName = 'photo',
  ref,
  onDrop,
}: {
  photoName?: string
  ref: Ref<TDropPhoto>
  onDrop?: (file: File) => void
}) => {
  const [file, setFile] = useState<File | null>(null)
  const [fileLocalUrl, setFileLocalUrl] = useState('')

  const handleDrop = async (acceptedFiles: File[]) => {
    const photo = acceptedFiles[0]
    setFile(photo)
    setFileLocalUrl(URL.createObjectURL(photo))
    onDrop?.(photo)
  }

  const handleRemove = () => {
    setFile(null)
    setFileLocalUrl('')
  }

  const handleGetFile = () => {
    return file
  }

  useImperativeHandle(ref, () => {
    return { remove: handleRemove, get: handleGetFile }
  }, [file])

  return (
    <>
      {file === null ? (
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()}>
              <input
                {...getInputProps()}
                accept='image/*'
                id='photo'
              />
              <div
                className={cn(
                  'bg-secondary border-primary flex h-[200px] w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed dark:border-white',
                  isDragActive && 'bg-primary/30',
                )}
              >
                <div>
                  <Upload
                    size={40}
                    className='mx-auto'
                  />
                  <p className='text-center font-bold'>
                    Drag & drop to upload {photoName}
                  </p>
                  <p className='text-primary text-center text-sm dark:text-white'>
                    or browse
                  </p>
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      ) : (
        <img
          src={fileLocalUrl}
          className='h-[200px] w-full object-contain'
        />
      )}
    </>
  )
}

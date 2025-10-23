import { useEffect, useState } from 'react'
import { api } from '@/api/lib/axios'

type Type = 'Profile Photo' | 'Signature' | 'Payment' | 'Finance Sign'

export const getFile = (url: string, type: Type) => {
  return api.get<ArrayBuffer>('/student/entranceForm/getFile', {
    params: {
      fileUrl: url,
      type,
    },
    responseType: 'arraybuffer',
  })
}

export const useGetFile = (url: string | null, type: Type) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (url) {
      setLoading(true)
      setIsError(false)
      getFile(url, type)
        .then((res) => {
          const blob = new Blob([res.data], { type: 'image/jpeg' })
          setFileUrl(URL.createObjectURL(blob))
        })
        .catch((err) => {
          console.log(err)
          setIsError(true)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setFileUrl(null)
    }
  }, [url])

  return { loading, isError, fileUrl }
}

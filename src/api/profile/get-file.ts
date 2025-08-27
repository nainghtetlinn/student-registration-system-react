import { useEffect, useState } from 'react'
import { api } from '../lib/axios'

export const getFile = (url: string, type: 'Profile Photo' | 'Signature') => {
  return api.get<ArrayBuffer>('/staff/profile/getFile', {
    params: {
      fileUrl: url,
      type,
    },
    responseType: 'arraybuffer',
  })
}

export const useGetProfileFile = (url: string | null) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (url)
      getFile(url, 'Profile Photo')
        .then((res) => {
          const blob = new Blob([res.data], { type: 'image/jpeg' })
          setFileUrl(URL.createObjectURL(blob))
          setIsError(false)
        })
        .catch((err) => {
          console.log(err)
          setIsError(true)
        })
        .finally(() => {
          setLoading(false)
        })
  }, [url])

  return { loading, isError, fileUrl }
}

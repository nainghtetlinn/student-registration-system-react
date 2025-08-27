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
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (url) {
      setLoading(true)
      setIsError(false)
      getFile(url, 'Profile Photo')
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

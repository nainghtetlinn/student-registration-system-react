import { useEffect, useState } from 'react'
import { api } from '../lib/axios'

export const getFile = (url: string, id: string) => {
  return api.get<ArrayBuffer>('/forms/getFile/' + id, {
    params: {
      fileUrl: url,
    },
    responseType: 'arraybuffer',
  })
}

export const useGetFile = (url: string | null, id: string) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (url) {
      setLoading(true)
      setIsError(false)
      getFile(url, id)
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

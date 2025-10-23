import { useEffect, useState } from 'react'
import { api } from '@/api/lib/axios'

export const downloadFile = (params: {
  studentId: number
  type: 'Entrance Form' | 'Subject Choice' | 'Registration'
}) => {
  return api.get<ArrayBuffer>('/file/download', {
    params,
    responseType: 'arraybuffer',
  })
}

export const useDownloadFile = (params: {
  studentId: number
  type: 'Entrance Form' | 'Subject Choice' | 'Registration'
}) => {
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null)
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!params.studentId || !params.type) return

    setLoading(true)
    setIsError(false)
    downloadFile(params)
      .then((res) => {
        console.log(res)
        setFileBuffer(res.data)
      })
      .catch((err) => {
        console.log(err)
        setIsError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, isError, fileBuffer }
}

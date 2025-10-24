import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Download } from 'lucide-react'

import { useState } from 'react'

import { downloadFile } from '../api/download-file.api'

export const DownloadBtn = ({
  studentId,
  type,
  label,
}: {
  studentId: number
  type: 'Entrance Form' | 'Subject Choice' | 'Registration'
  label: string
}) => {
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDownload = () => {
    if (!studentId) return

    setLoading(true)
    downloadFile({ studentId, type })
      .then((res) => {
        setFileBuffer(res.data)
        console.log(res.data)
        const blob = new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${type.replace(' ', '_')}_${studentId}.docx` // example filename
        document.body.appendChild(a)
        a.click()
        a.remove()

        setTimeout(() => URL.revokeObjectURL(url), 1000)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button
      variant={'outline'}
      disabled={loading}
      onClick={handleDownload}
    >
      {loading ? <Spinner /> : <Download />} {label}
    </Button>
  )
}

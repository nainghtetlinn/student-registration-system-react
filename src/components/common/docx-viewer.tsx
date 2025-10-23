import { useEffect, useState } from 'react'
import mammoth from 'mammoth'

type DocxViewerProps = {
  fileBuffer: ArrayBuffer
}

export const DocxViewer = ({ fileBuffer }: DocxViewerProps) => {
  const [html, setHtml] = useState<string>('Loading...')

  useEffect(() => {
    const render = async () => {
      const result = await mammoth.convertToHtml({ arrayBuffer: fileBuffer })
      setHtml(result.value)
    }
    render()
  }, [fileBuffer])

  return (
    <div
      className='prose max-w-none rounded bg-white p-6 shadow-sm'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

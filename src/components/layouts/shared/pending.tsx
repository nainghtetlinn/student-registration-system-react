import { Loader2 } from 'lucide-react'

export const Pending = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <Loader2
        size={40}
        className='animate-spin'
      />
    </div>
  )
}

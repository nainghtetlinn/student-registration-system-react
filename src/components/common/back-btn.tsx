import { useNavigate } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

export const BackBtn = () => {
  const navigate = useNavigate()

  return (
    <Button
      variant='secondary'
      onClick={() => navigate({ to: '..' })}
    >
      <ArrowLeft /> Back
    </Button>
  )
}

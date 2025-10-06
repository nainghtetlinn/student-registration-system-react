import { useState } from 'react'

type Props = {
  start?: number
  totalSteps: number
}

export function useMultistep({ start = 0, totalSteps }: Props) {
  const [active, setActive] = useState(start)

  const handleNext = async () => {
    if (active < totalSteps - 1) {
      setActive((prev) => prev + 1)
    }
  }
  const handlePrevious = () => {
    if (active > 0) {
      setActive((prev) => prev - 1)
    }
  }

  return {
    current: active,
    next: handleNext,
    previous: handlePrevious,
  }
}

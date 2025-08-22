import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { TNrcSchema } from './schema'
import { nrcStates, nrcTownships, nrcTypes } from '@/assets/NRC_Data.min.json'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function nrcObjectToString(nrc: TNrcSchema): string {
  const transformedNrc: TNrcSchema = {
    nrcNumber: '',
    nrcType: '',
    townshipCode: '',
    stateCode: '',
  }
  transformedNrc.stateCode =
    nrcStates.find((v) => v.id == nrc.stateCode)?.number.en || ''
  transformedNrc.townshipCode =
    nrcTownships.find((v) => v.id == nrc.townshipCode)?.short.en || ''
  transformedNrc.nrcType =
    nrcTypes.find((v) => v.id == nrc.nrcType)?.name.en || ''
  transformedNrc.nrcNumber = nrc.nrcNumber

  return `${transformedNrc.stateCode}/${transformedNrc.townshipCode}(${transformedNrc.nrcType})${transformedNrc.nrcNumber}`
}

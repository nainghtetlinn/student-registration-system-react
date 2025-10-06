import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { nrcDefaults, type TNrcSchema, type TRollNoSchema } from './schema'
import { nrcStates, nrcTownships, nrcTypes } from '@/assets/NRC_Data.min.json'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function nrcObjectToString(nrc: TNrcSchema): string {
  const transformedNrc: TNrcSchema = nrcDefaults
  transformedNrc.stateCode =
    nrcStates.find((v) => v.id == nrc.stateCode)?.number.en || ''
  transformedNrc.townshipCode =
    nrcTownships.find((v) => v.id == nrc.townshipCode)?.short.en || ''
  transformedNrc.nrcType =
    nrcTypes.find((v) => v.id == nrc.nrcType)?.name.en || ''
  transformedNrc.nrcNumber = nrc.nrcNumber

  return `${transformedNrc.stateCode}/${transformedNrc.townshipCode}(${transformedNrc.nrcType})${transformedNrc.nrcNumber}`
}

export function nrcStringToObject(nrcString: string): TNrcSchema {
  const nrcPattern =
    /^([1-9]|1[0-3])\/([A-Za-z]{1,6})\((N|E|P|T|Y|S)\)([0-9၀၁၂၃၄၅၆၇၈၉]{6})$/

  const match = nrcString.match(nrcPattern)

  if (!match) return nrcDefaults

  const stateCode = nrcStates.find((v) => v.number.en === match[1])?.id || ''
  const townshipCode =
    nrcTownships.find((v) => v.short.en === match[2])?.id || ''
  const nrcType = nrcTypes.find((v) => v.name.en === match[3])?.id || ''
  const nrcNumber = match[4]

  if (!stateCode || !townshipCode || !nrcType) return nrcDefaults

  return {
    stateCode,
    townshipCode,
    nrcType,
    nrcNumber,
  }
}

export function rollNoObjectToString(rollNo: TRollNoSchema): string {
  return `${rollNo.year}${rollNo.major}-${rollNo.no}`
}

export function rollNoStringToObject(
  rollNoString: string,
): TRollNoSchema | null {
  const rollNoPattern = /^([1-6])(CIVIL|MN|MECH|EC|EP|CEIT)-(\d+)$/

  const match = rollNoString.match(rollNoPattern)

  if (!match) return null

  return {
    year: parseInt(match[1], 10),
    major: match[2],
    no: parseInt(match[3], 10),
  }
}

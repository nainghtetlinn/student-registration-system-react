export type NrcState = {
  id: string
  code: string
  number: {
    en: string
    mm: string
  }
  name: {
    en: string
    mm: string
  }
}
export type NrcTownship = {
  id: string
  code: string
  short: {
    en: string
    mm: string
  }
  name: {
    en: string
    mm: string
  }
  stateId: string
  stateCode: string
}
export type NrcType = {
  id: string
  name: {
    en: string
    mm: string
  }
}

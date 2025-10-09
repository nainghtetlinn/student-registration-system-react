export type TCreateFormRequest = {
  academicYear: string
  number: string
  code: string
}
export type TCreateFormResponse = string

export type TUpdateFormRequest = {
  academicYear: string
  number: string
  code: string
  isOpen: boolean
}
export type TUpdateFormResponse = string

export type TForm = {
  id: string
  academicYear: string
  number: string
  code: string
  stampUrl: string
  createdAt: Date
  updatedAt: Date | null
  open: boolean
}

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
}
export type TUpdateFormResponse = string

export type TGetFormsResponse = TForm[]

export type TGetFormResponse = TForm

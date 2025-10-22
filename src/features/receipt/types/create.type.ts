export type TCreateReceiptRequest = {
  year: string
  data: { name: string; amount: number }[]
}

export type TCreateReceiptResponse = string

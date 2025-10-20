export type TUpdateReceiptRequest = {
  year: string
  data: { name: string; amount: number }[]
}

export type TUpdateReceiptResponse = string

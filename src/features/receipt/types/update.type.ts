export type TUpdateReceiptRequest = {
  year: string
  data: { name: string; amount: number }[]
  phoneNumbers: { phoneNumber: string }[]
}

export type TUpdateReceiptResponse = string

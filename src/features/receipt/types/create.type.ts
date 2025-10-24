export type TCreateReceiptRequest = {
  year: string
  data: { name: string; amount: number }[]
  phoneNumbers: { phoneNumber: string }[]
}

export type TCreateReceiptResponse = string

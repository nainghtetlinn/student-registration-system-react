export type TReceipt = {
  id: number
  year: string
  data: { name: string; amount: number }[]
  createdAt: string
  updatedAt: string | null
}

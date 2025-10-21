export type TData = { name: string; amount: number }

export type TReceipt = {
  id: number
  year: string
  data: TData[]
  createdAt: string
  updatedAt: string | null
}

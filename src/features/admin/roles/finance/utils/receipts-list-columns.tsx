import type { ColumnDef } from '@tanstack/react-table'
import type { TReceipt, TData } from '../types/receipt.type'

import { format } from 'date-fns'

export const receiptsListColumns: ColumnDef<TReceipt>[] = [
  { accessorKey: 'id', header: 'Id' },
  { accessorKey: 'year', header: 'Year' },
  {
    accessorKey: 'data',
    header: 'Total Amount',
    cell: ({ getValue }) => {
      return (
        (getValue() as TData[]).reduce((sum, item) => sum + item.amount, 0) +
        ' Ks'
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ getValue }) =>
      format(getValue() as string, 'MMM dd, yyyy, h:mm a'),
  },
]

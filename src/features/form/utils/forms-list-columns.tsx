import { Badge } from '@/components/ui/badge'
import { BadgeCheckIcon, BadgeXIcon } from 'lucide-react'

import { type ColumnDef } from '@tanstack/react-table'

import type { TForm } from '@/types/form'

export const formsListColumns: ColumnDef<TForm>[] = [
  { accessorKey: 'academicYear', header: 'Academic Year' },
  { accessorKey: 'code', header: 'Code' },
  { accessorKey: 'number', header: 'Number' },
  {
    accessorKey: 'open',
    header: 'Status',
    cell: ({ getValue }) =>
      getValue() ? (
        <Badge
          variant='secondary'
          className='bg-blue-500 text-white dark:bg-blue-600'
        >
          <BadgeCheckIcon />
          Open
        </Badge>
      ) : (
        <Badge variant='secondary'>
          <BadgeXIcon />
          Closed
        </Badge>
      ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
]

import { Badge } from '@/components/ui/badge'
import { BadgeCheckIcon, BadgeXIcon } from 'lucide-react'

import { type ColumnDef } from '@tanstack/react-table'

import type { TUser } from '@/types/user'

export const accountsListColumns: ColumnDef<TUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => getValue() ?? 'N/A',
  },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
  {
    accessorKey: 'updatedAt',
    header: 'Status',
    cell: ({ getValue }) =>
      getValue() ? (
        <Badge
          variant='secondary'
          className='bg-blue-500 text-white dark:bg-blue-600'
        >
          <BadgeCheckIcon />
          Verified
        </Badge>
      ) : (
        <Badge variant='secondary'>
          <BadgeXIcon />
          Not Verified
        </Badge>
      ),
  },
]

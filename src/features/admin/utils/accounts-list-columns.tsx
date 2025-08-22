import { Badge } from '@/components/ui/badge'

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
        <Badge variant='secondary'>Verified</Badge>
      ) : (
        <Badge variant='outline'>Not Verified</Badge>
      ),
  },
]

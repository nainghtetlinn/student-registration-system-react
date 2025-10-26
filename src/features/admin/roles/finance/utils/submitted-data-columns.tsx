import type { ColumnDef } from '@tanstack/react-table'
import type { TSubmittedData } from '../types/submitted-data.type'

import { format } from 'date-fns'

export const submittedDataColumns: ColumnDef<TSubmittedData>[] = [
  {
    accessorKey: 'studentId',
    header: 'Id',
  },
  {
    accessorKey: 'studentNameEng',
    header: 'Name (eng)',
  },
  {
    accessorKey: 'studentNameMM',
    header: 'Name (mm)',
  },
  {
    accessorKey: 'enrollmentNumber',
    header: 'Enrollment Number',
    cell: ({ getValue }) => getValue() ?? 'N/A',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ getValue }) =>
      format(getValue() as string, 'MMM dd, yyyy, h:mm a'),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ getValue }) =>
      format(getValue() as string, 'MMM dd, yyyy, h:mm a'),
  },
]

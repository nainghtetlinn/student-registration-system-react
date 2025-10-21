import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { TReceipt } from '../types/receipt.type'

import { useNavigate } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useGetReceipts } from '../api/get-receipts.api'
import { receiptsListColumns } from '../utils/receipts-list-columns'

export const ReceiptsListTable = () => {
  const navigate = useNavigate()

  const { data, isPending } = useGetReceipts()

  const table = useReactTable<TReceipt>({
    data: data || [],
    columns: receiptsListColumns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
  })

  return (
    <div className='relative p-2'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => {
                  navigate({
                    to: '/admin/receipts/$id',
                    params: { id: row.original.id.toString() },
                  })
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={receiptsListColumns.length}
                className='h-24 text-center'
              >
                {isPending ? (
                  <Spinner className='mx-auto' />
                ) : (
                  <span>No results.</span>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

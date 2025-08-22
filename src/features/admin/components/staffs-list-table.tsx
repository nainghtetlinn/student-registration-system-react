import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader2 } from 'lucide-react'

import { useNavigate } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useInView } from 'react-intersection-observer'

import { paths } from '@/config/paths'
import type { TUser } from '@/types/user'
import { useGetAllAccounts } from '../hooks/useGetAllAccounts'
import { accountsListColumns } from '../utils/accounts-list-columns'
import { useEffect } from 'react'

export const StaffsListTable = () => {
  const navigate = useNavigate()
  const { ref, inView } = useInView()

  const { data, fetchNextPage, hasNextPage } = useGetAllAccounts({
    queryKey: ['staffs'],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  const table = useReactTable<TUser>({
    data: data || [],
    columns: accountsListColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  return (
    <div className='relative h-full'>
      <div className='absolute inset-0 overflow-x-hidden p-2'>
        <div className='overflow-hidden rounded-md border'>
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
                        to:
                          paths.admin.staffs.getHref() + '/' + row.original.id,
                      })
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={accountsListColumns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
              {table.getRowModel().rows?.length > 0 && hasNextPage && (
                <TableRow>
                  <TableCell
                    ref={ref}
                    colSpan={accountsListColumns.length}
                    className='h-12'
                  >
                    <Loader2 className='mx-auto animate-spin' />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

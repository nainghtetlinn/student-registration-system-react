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
import { useEffect } from 'react'
import { useGetAllAccounts } from '../hooks/useGetAllAccounts'
import { accountsListColumns } from '../utils/accounts-list-columns'

export const StudentsListTable = () => {
  const navigate = useNavigate()
  const { ref, inView } = useInView()

  const { data, isPending, fetchNextPage, hasNextPage } = useGetAllAccounts(
    {
      queryKey: ['students'],
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
    { role: 'Student' },
  )

  const table = useReactTable<TUser>({
    data: data || [],
    columns: accountsListColumns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
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
                    {isPending ? (
                      <Loader2 className='mx-auto animate-spin' />
                    ) : (
                      <span>No results.</span>
                    )}
                  </TableCell>
                </TableRow>
              )}
              {table.getRowModel().rows?.length > 0 && hasNextPage && (
                <TableRow>
                  <TableCell
                    ref={ref}
                    colSpan={accountsListColumns.length}
                    className='h-12'
                  ></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

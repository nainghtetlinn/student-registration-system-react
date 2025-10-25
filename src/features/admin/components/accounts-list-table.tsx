import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Loader2, Search } from 'lucide-react'

import type { QueryKey } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import {
  useGetAllAccounts,
  type TFilterGetAccountsInput,
} from '@/api/admin/get-all-accounts'
import { paths } from '@/config/paths'
import type { TUser } from '@/types/user'
import { accountsListColumns } from '../utils/accounts-list-columns'
import { Button } from '@/components/ui/button'

export const AccountsListTable = ({
  queryKey,
  search,
}: {
  queryKey: QueryKey
  search?: Omit<TFilterGetAccountsInput, 'page'>
}) => {
  const navigate = useNavigate()
  const { ref, inView } = useInView()
  const [k, setK] = useState('')

  const { data, isPending, fetchNextPage, hasNextPage, refetch } =
    useGetAllAccounts(
      {
        queryKey,
        refetchOnWindowFocus: false,
      },
      { ...search, keyword: k },
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
    <div className='relative p-2'>
      <form
        className='mb-2 flex w-full justify-end gap-2'
        onSubmit={(e) => {
          e.preventDefault()
          refetch()
        }}
      >
        <Input
          value={k}
          className='w-[300px]'
          placeholder='Search ...'
          onChange={(e) => setK(e.target.value)}
        />
        <Button size={'icon'}>
          <Search />
        </Button>
      </form>
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
                    to: paths.admin.accounts.details.getHref(
                      row.original.email,
                    ),
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
  )
}

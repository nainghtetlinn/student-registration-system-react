import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowDown, ArrowUp, Loader2 } from 'lucide-react'

import type { TUser } from '@/types/user'

import { useNavigate } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDebouncedCallback } from 'use-debounce'

import { useGetAllAccounts } from '@/api/admin/get-all-accounts'
import { paths } from '@/config/paths'
import { accountsListColumns } from '../utils/accounts-list-columns'

export const AccountsListTable = () => {
  const navigate = useNavigate()
  const { ref, inView } = useInView()

  const [keyword, setKeyword] = useState('')
  const [field, setField] = useState('createdAt')
  const [direction, setDirection] = useState('desc')
  const [role, setRole] = useState('All')

  const debounced = useDebouncedCallback((k: string) => setKeyword(k), 500)

  const { data, isPending, fetchNextPage, hasNextPage, refetch } =
    useGetAllAccounts({
      keyword,
      sortDirection: direction,
      sortField: field,
      role: role === 'All' ? '' : role,
    })

  const table = useReactTable<TUser>({
    data: data || [],
    columns: accountsListColumns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
  })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  useEffect(() => {
    refetch()
  }, [keyword, direction, field, role])

  return (
    <div className='relative p-2'>
      <div className='mb-4 flex w-full flex-wrap items-center justify-end gap-2'>
        <Select
          value={role}
          onValueChange={setRole}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='All'>All</SelectItem>
            <SelectItem value='Admin'>Admin</SelectItem>
            <SelectItem value='Student Affair'>Student Affair</SelectItem>
            <SelectItem value='Finance'>Finance</SelectItem>
            <SelectItem value='Dean'>Dean</SelectItem>
            <SelectItem value='Student'>Student</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={field}
          onValueChange={setField}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='email'>Email</SelectItem>
            <SelectItem value='createdAt'>Created at</SelectItem>
            <SelectItem value='updatedAt'>Updated at</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={direction}
          onValueChange={setDirection}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='asc'>
              <ArrowUp /> Asc
            </SelectItem>
            <SelectItem value='desc'>
              <ArrowDown /> Desc
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          onChange={(e) => debounced(e.target.value)}
          placeholder='Search ...'
          className='w-[240px]'
        />
      </div>
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

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowDown, ArrowUp } from 'lucide-react'

import type { TSubmittedData } from '../types/submitted-data.type'

import { useNavigate } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDebouncedCallback } from 'use-debounce'

import { useGetAllSubmittedVerifiedData } from '../api/get-all-submitted-verified-data.api'
import { submittedDataColumns } from '../utils/submitted-data-columns'

export const StudentsStatusDashboard = () => {
  const navigate = useNavigate()
  const { ref, inView } = useInView()

  const [keyword, setKeyword] = useState('')
  const [field, setField] = useState('createdAt')
  const [direction, setDirection] = useState('desc')

  const debounced = useDebouncedCallback((k: string) => setKeyword(k), 500)

  const { data, isPending, fetchNextPage, hasNextPage, refetch } =
    useGetAllSubmittedVerifiedData({
      keyword,
      sortDirection: direction,
      sortField: field,
    })

  const table = useReactTable<TSubmittedData>({
    data: data || [],
    columns: submittedDataColumns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
  })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  useEffect(() => {
    refetch()
  }, [keyword, direction, field])

  return (
    <div className='relative p-2'>
      <div className='mb-4 flex w-full flex-wrap items-center justify-end gap-2'>
        <Select
          value={field}
          onValueChange={setField}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='mmName'>Name (mm)</SelectItem>
            <SelectItem value='engName'>Name (eng)</SelectItem>
            <SelectItem value='enrollmentNumber'>Enrollment number</SelectItem>
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
                    to: '/admin/review/$id',
                    params: {
                      id: row.original.studentId.toString(),
                    },
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
                colSpan={submittedDataColumns.length}
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
          {table.getRowModel().rows?.length > 0 && hasNextPage && (
            <TableRow>
              <TableCell
                ref={ref}
                colSpan={submittedDataColumns.length}
                className='h-12'
              ></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

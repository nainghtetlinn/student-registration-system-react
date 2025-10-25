import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search } from 'lucide-react'

import type { TData } from '../api/get-all-submitted-data.api'
import type { TSubmittedData } from '../types/submitted-data.type'

import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { env } from '@/config/env'
import { useGetAllSubmittedData } from '../api/get-all-submitted-data.api'
import { submittedDataColumns } from '../utils/submitted-data-columns'

export const StudentAffairDashboard = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [k, setK] = useState('')

  const { ref, inView } = useInView()

  const { data, isPending, fetchNextPage, hasNextPage, refetch } =
    useGetAllSubmittedData({ queryKey: ['submitted-data'] }, { keyword: k })

  const table = useReactTable<TSubmittedData>({
    data: data || [],
    columns: submittedDataColumns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
  })

  useEffect(() => {
    const source = new EventSource(env.API_URL + '/studentAffair/subscribe', {
      withCredentials: true,
    })

    source.onmessage = (event) => {
      const newMessage = JSON.parse(event.data)

      queryClient.setQueryData(['submitted-data'], (oldData: TData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              items: [newMessage, ...oldData.pages[0].items],
            },
            ...oldData.pages.slice(1),
          ],
        }
      })
    }

    source.onerror = (err) => {
      console.error('SSE error:', err)
      source.close()
    }

    return () => source.close()
  }, [queryClient])

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  return (
    <div className='relative p-2'>
      <h2 className='mb-4 text-center text-2xl font-bold'>
        Student Affair Dashboard
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          refetch()
        }}
        className='flex w-full justify-end gap-2'
      >
        <Input
          className='w-[300px]'
          placeholder='Search ...'
          value={k}
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

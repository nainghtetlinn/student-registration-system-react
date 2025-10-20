import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { TSubmittedData } from '../types/submitted-data.type'
import type { TData } from '../api/get-all-submitted-data.api'

import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { env } from '@/config/env'
import { useGetAllSubmittedData } from '../api/get-all-submitted-data.api'
import { submittedDataColumns } from '../utils/submitted-data-columns'

export const FinanceDashboard = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { ref, inView } = useInView()

  const { data, isPending, fetchNextPage, hasNextPage } =
    useGetAllSubmittedData({ queryKey: ['submitted-data'] })

  const table = useReactTable<TSubmittedData>({
    data: data || [],
    columns: submittedDataColumns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
  })

  useEffect(() => {
    const source = new EventSource(env.API_URL + '/finance/subscribe')

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
      <h2 className='mb-4 text-center text-2xl font-bold'>Finance Dashboard</h2>
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
                {isPending ? <Spinner /> : <span>No results.</span>}
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

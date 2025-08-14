import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_documents/shortcuts')({
  component: RouteComponent,
})

const data = [{ title: 'Toggle sidebar', shortcut: 'Ctrl + B' }]

function RouteComponent() {
  return (
    <div>
      <h2 className='px-2 py-4 font-bold'>Shortcuts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Actions</TableHead>
            <TableHead>Shortcuts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((d) => (
            <TableRow key={d.shortcut}>
              <TableCell>{d.title}</TableCell>
              <TableCell>{d.shortcut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

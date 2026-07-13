'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAsyncList } from '@react-stately/data'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { Search } from 'lucide-react'
import { columns } from '@/utils/data'
import { localize } from '@/app/lib/utils/localize'

export default function DataTable({ emps }) {
  const router = useRouter()
  const pathname = usePathname()
  const renderCell = useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey]

      switch (columnKey) {
        case 'firstname':
          return <p className='text-base'>{cellValue}</p>
        case 'lastname':
          return <p className='text-base'>{cellValue}</p>
        case 'position':
          return <p className='text-base'>{cellValue}</p>
        case 'actions':
          return (
            <div className='relative flex items-center justify-center gap-2'>
              <Button
                variant='solid'
                color='primary'
                size='sm'
                radius='full'
                onClick={() => router.push(`${pathname}/${user.id}`)}
              >
                <Search className='rotate-90' size={20} />
                <span>مشاهده جزئیات</span>
              </Button>
            </div>
          )
        default:
          return cellValue
      }
    },
    // eslint-disable-next-line
    [],
  )

  const data = emps.map(emp => ({
    ...emp,
    percent: '%' + localize(Math.round((emp.cnt_done / emp.cnt_referred) * 100)),
  }))

  let list = useAsyncList({
    async load({ signal }) {
      return {
        items: data,
      }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column]
          let second = b[sortDescriptor.column]
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

          if (sortDescriptor.direction === 'descending') {
            cmp *= -1
          }

          return cmp
        }),
      }
    },
  })

  const classNames = useMemo(
    () => ({
      th: ['bg-steel', 'text-white', 'rounded-r-none', 'pt-3'],
      td: [
        'py-3',
        'text-right',
        'border-l',
        'border-r',
        'border-b',
        'text-center',
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    [],
  )

  return (
    <Table
      dir='ltr'
      aria-label='table'
      isStriped
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      classNames={classNames}
    >
      <TableHeader columns={columns}>
        {column => (
          <TableColumn
            key={column.uid}
            allowsSorting={
              column.uid !== 'actions' &&
              column.uid !== 'firstname' &&
              column.uid !== 'lastname' &&
              column.uid !== 'position'
            }
          >
            <p
              className={`text-sm text-center ${
                column.uid === 'firstname' &&
                column.uid === 'lastname' &&
                column.uid === 'position' &&
                'pb-4'
              }`}
            >
              {column.name}
            </p>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={list.items}>
        {item => (
          <TableRow key={item.id} className='rounded-none'>
            {columnKey => (
              <TableCell>
                {typeof renderCell(item, columnKey) === 'number'
                  ? localize(renderCell(item, columnKey))
                  : renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

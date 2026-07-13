import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

export default function DataTable({ rows }) {
  const columns = [
    {
      key: 'record_date',
      label: 'تاریخ',
    },
    { label: 'تعداد کل وظایف', key: 'cnt_referred' },
    { label: 'تعداد وظایف انجام شده', key: 'cnt_done' },
    { label: 'تعداد وظایف عقب افتاده', key: 'cnt_overdue' },
  ]

  if (rows.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <p className='text-xl font-bold text-neutral-400'>نتیجه ای یافت نشد</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {item => (
          <TableRow key={item.record_date}>
            {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

import { useCallback } from 'react'
import {
  Button,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { Pencil, Trash } from 'lucide-react'

const columns = [
  { name: 'نام', uid: 'firstname' },
  { name: 'نام خانوادگی', uid: 'lastname' },
  { name: 'کد پرسنلی', uid: 'id' },
  { name: 'مسئولیت', uid: 'position' },
  { name: '', uid: 'actions' },
]

export default function EmployeeTable({ rows }) {
  const renderCell = useCallback((emp, columnKey) => {
    const cellValue = emp[columnKey]

    switch (columnKey) {
      case 'firstname':
        return <p>{emp.firstname}</p>
      case 'lastname':
        return <p>{emp.lastname}</p>
      case 'id':
        return <p>{emp.id}</p>
      case 'actions':
        return (
          <div className='flex gap-2'>
            <Button
              color='primary'
              radius='full'
              size='sm'
              //   onClick={() => setSelectedDepartment(emp)}
            >
              <Pencil size={20} />
            </Button>
            <Button
              color='danger'
              radius='full'
              size='sm'
              //   onClick={() => onDepartmentDelete(emp)}
            >
              <Trash size={20} />
            </Button>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Table aria-label='Example table with custom cells'>
      <TableHeader columns={columns}>
        {column => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {item => (
          <TableRow key={item.name}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

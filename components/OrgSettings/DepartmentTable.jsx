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
  { name: 'نام بخش', uid: 'name' },
  { name: 'نام مسئول', uid: 'manager_name' },
  { name: '', uid: 'actions' },
]

export default function DepartmentTable({
  rows,
  setSelectedDepartment,
  onDepartmentDelete,
}) {
  const renderCell = useCallback((dep, columnKey) => {
    const cellValue = dep[columnKey]

    switch (columnKey) {
      case 'name':
        return <p>{dep.name}</p>
      case 'manager_name':
        return <p>{dep.manager_name}</p>
      case 'actions':
        return (
          <div className='flex gap-2'>
            <Button
              color='primary'
              radius='full'
              size='sm'
              onClick={() => setSelectedDepartment(dep)}
            >
              <Pencil size={20} />
            </Button>
            <Button
              color='danger'
              radius='full'
              size='sm'
              onClick={() => onDepartmentDelete(dep)}
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

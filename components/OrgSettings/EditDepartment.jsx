import React, { useState } from 'react'
import { Form, Input, Button, Select, SelectItem } from '@nextui-org/react'

export default function EditDepartment({ employees }) {
  const [selectedEmployee, setSelectedEmployee] = useState('')

  const [action, setAction] = useState(null)

  return (
    <Form
      className='w-full max-w-xs flex flex-col gap-4'
      validationBehavior='native'
      onReset={() => setAction('reset')}
      onSubmit={e => {
        e.preventDefault()
        let data = Object.fromEntries(new FormData(e.currentTarget))

        setAction(`submit ${JSON.stringify(data)}`)
      }}
    >
      <Input
        errorMessage='Please enter a valid username'
        label='نام بخش'
        labelPlacement='outside'
        name='name'
        placeholder='نام بخش را وارد کنید'
        type='text'
        variant='bordered'
      />

      <Select
        variant='bordered'
        className='max-w-md'
        label='انتخاب مدیر'
        labelPlacement='outside'
        placeholder='یک پرسنل را انتخاب کنید'
        selectedKeys={[selectedEmployee]}
        onChange={e => {
          setSelectedEmployee(e.target.value)
        }}
      >
        {employees?.map(emp => (
          <SelectItem
            key={emp.id}
            textValue={`${emp.firstname} ${emp.lastname}`}
          >
            {emp.firstname} {emp.lastname}
          </SelectItem>
        ))}
      </Select>

      <div className='flex gap-2'>
        <Button color='primary' type='submit'>
          ثبت
        </Button>
        <Button type='reset' variant='ghost'>
          پاکسازی فرم
        </Button>
      </div>
      {action && (
        <div className='text-small text-default-500'>
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  )
}

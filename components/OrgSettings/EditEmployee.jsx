import { useState } from 'react'
import { Form, Input, Button, Select, SelectItem } from '@nextui-org/react'

export default function EditEmployee({ departments }) {
  const [selectedDepartment, setSelectedDepartment] = useState('')
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
        label='نام'
        labelPlacement='outside'
        name='firstname'
        placeholder='نام را وارد کنید'
        type='text'
        variant='bordered'
      />
      <Input
        errorMessage='Please enter a valid username'
        label='نام خانوادگی'
        labelPlacement='outside'
        name='lastname'
        placeholder='نام خانوادگی را وارد کنید'
        type='text'
        variant='bordered'
      />
      <Input
        errorMessage='Please enter a valid username'
        label='مسئولیت'
        labelPlacement='outside'
        name='role'
        placeholder='مسئولیت را وارد کنید'
        type='text'
        variant='bordered'
      />

      <Select
        variant='bordered'
        className='max-w-md'
        label='نام بخش'
        labelPlacement='outside'
        placeholder='یک بخش را انتخاب کنید'
        selectedKeys={[selectedDepartment]}
        onChange={e => {
          setSelectedDepartment(e.target.value)
        }}
      >
        {departments?.map(dep => (
          <SelectItem key={dep.id}>{dep.name}</SelectItem>
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

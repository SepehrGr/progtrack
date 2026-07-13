'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
  Button,
  DatePicker,
  Divider,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { api } from '../lib/api'
import Table from '@/components/Table'
import { Download, FileCheck, Loader2 } from 'lucide-react'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import { getDate } from '../lib/utils/getDate'
import { useSearchParams } from 'next/navigation'

const fetcher = url => api.get(url).then(res => res.data)

export default function Page() {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [selectedValue, setSelectedValue] = useState('daily')
  const [employees, setEmployees] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams()
  let dep = searchParams.get('dep')

  useEffect(() => {
    const fetchEmployees = async () => {
      if (selectedDepartment !== '') {
        const data = await api.get(`/departments/${selectedDepartment}/employees`)
        setEmployees(data.data.employees)
      }
    }

    fetchEmployees()
  }, [selectedDepartment])

  const { data, error } = useSWR(`/departments`, fetcher)
  const departments = data

  const onGetReport = async () => {
    setReport(null)
    setIsLoading(true)
    const start = getDate(startDate)
    const end = getDate(endDate)
    const since = start.toISOString()
    const until = end.toISOString()
    if (selectedEmployee == '') {
      const { data } = await api.get(
        `/reports/${selectedDepartment}?since=${since}&until=${until}`,
      )
      setReport(data)
    } else {
      const { data } = await api.get(
        `/reports/employees/${selectedEmployee}?since=${since}&until=${until}`,
      )
      setReport(data)
    }

    setIsLoading(false)
  }

  return (
    <DashboardContainer>
      <DashboardHeader>گزارش ها</DashboardHeader>
      <section className='py-10 px-7'>
        <div className='grid items-center grid-cols-3 gap-32 mb-14'>
          <DatePicker
            className='max-w-md'
            variant='bordered'
            value={startDate}
            onChange={setStartDate}
            label='تاریخ شروع'
            labelPlacement='outside'
          />
          <DatePicker
            className='max-w-md'
            variant='bordered'
            value={endDate}
            onChange={setEndDate}
            minValue={startDate && startDate.add({ days: 1 })}
            label='تاریخ پایان'
            labelPlacement='outside'
          />
          {/* Selected date: {selectedDate?.start} - {selectedDate?.end} */}
          <RadioGroup
            label='مبنای محاسبه'
            orientation='horizontal'
            value={selectedValue}
            onValueChange={setSelectedValue}
          >
            <Radio value='daily'>روزانه</Radio>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <Radio value='weekly'>هفتگی</Radio>
          </RadioGroup>
        </div>
        <div className='grid items-center grid-cols-3 gap-32'>
          <Select
            variant='bordered'
            className='max-w-md'
            label='نام بخش'
            labelPlacement='outside'
            placeholder='یک بخش را انتخاب کنید'
            selectedKeys={[selectedDepartment]}
            defaultSelectedKeys={dep}
            onChange={e => {
              setSelectedDepartment(e.target.value)
              setSelectedEmployee('')
            }}
          >
            {departments?.map(dep => (
              <SelectItem key={dep.id}>{dep.name}</SelectItem>
            ))}
          </Select>
          {employees ? (
            <>
              <Select
                variant='bordered'
                className='max-w-md'
                label='نام پرسنل'
                labelPlacement='outside'
                placeholder='یک پرسنل را انتخاب کنید'
                selectedKeys={[selectedEmployee]}
                onChange={e => {
                  setSelectedEmployee(e.target.value)
                }}
              >
                {employees.map(emp => (
                  <SelectItem
                    key={emp.id}
                    textValue={`${emp.firstname} ${emp.lastname}`}
                  >
                    {emp.firstname} {emp.lastname}
                  </SelectItem>
                ))}
              </Select>
            </>
          ) : null}
        </div>
        {startDate && endDate && selectedDepartment ? (
          <div className='flex flex-row gap-5 mt-14'>
            <Button
              size='lg'
              color='primary'
              onClick={onGetReport}
              isDisabled={isLoading}
            >
              {isLoading ? <Loader2 className='animate-spin' /> : <FileCheck />}
              {isLoading && 'در حال '}آماده سازی گزارش
            </Button>
            <Button size='lg' variant='bordered' color='secondary'>
              <Download />
              دریافت گزارش
            </Button>
          </div>
        ) : null}
        <Divider className='my-10' />
        {report && <Table rows={report} />}
      </section>
    </DashboardContainer>
  )
}

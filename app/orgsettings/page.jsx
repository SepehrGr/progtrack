'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { api } from '../lib/api'
import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import EditDepartment from '@/components/OrgSettings/EditDepartment'
import EditEmployee from '@/components/OrgSettings/EditEmployee'
import DepartmentTable from '@/components/OrgSettings/DepartmentTable'
import { toast } from 'react-toastify'
import EmployeeTable from '@/components/OrgSettings/EmployeeTable'
import { Divider } from '@nextui-org/react'

const fetcher = url => api.get(url).then(res => res.data)

export default function Page() {
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  const departments = useSWR('/departments', fetcher)
  const employees = useSWR('/employees', fetcher)

  const onDepartmentDelete = async dep => {
    const data = await api.delete(`/departments/${dep.id}`)
    if (data.status === 200) {
      toast.success('بخش مورد نظر حذف گردید')
    } else {
      toast.error('خطا هنگام حذف بخش')
    }
  }

  return (
    <DashboardContainer>
      <DashboardHeader>تنظیمات بخش و پرسنل سازمان</DashboardHeader>
      <section className='flex flex-col gap-10 py-10 px-7'>
        <div>
          <h2 className='mb-5 text-xl font-bold'>لیست بخش های سازمان</h2>
          <div className='grid grid-cols-2 gap-48'>
            <div>
              {departments?.data && (
                <DepartmentTable
                  rows={departments.data}
                  setSelectedDepartment={setSelectedDepartment}
                  onDepartmentDelete={onDepartmentDelete}
                />
              )}
            </div>
            <EditDepartment employees={employees?.data} />
          </div>
        </div>
        <Divider />
        <div>
          <h2 className='mb-5 text-xl font-bold'>لیست کارکنان سازمان</h2>
          <div className='grid grid-cols-2 gap-32'>
            <div>{employees?.data && <EmployeeTable rows={employees.data} />}</div>
            <EditEmployee departments={departments?.data} />
          </div>
        </div>
      </section>
    </DashboardContainer>
  )
}

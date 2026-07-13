'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import { toast } from 'react-toastify'
import { Button } from '@nextui-org/react'
import { ArrowRight, RefreshCcw } from 'lucide-react'
import Spinner from '@/components/Spinner'
import DataTable from '@/components/DataTable'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import { useRouter } from 'next/navigation'

export default function DepartmentPage({ params }) {
  const router = useRouter()
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: () => api.get(`departments/${params.slug}/employees`),
    refetchOnWindowFocus: false,
  })

  const dep = data?.data

  if (isError) {
    toast.error('خطایی رخ داده است')
    return (
      <div className='flex items-center justify-center w-full h-screen gap-6'>
        <Button onClick={refetch}>
          <RefreshCcw />
          تلاش مجدد
        </Button>
      </div>
    )
  }

  return (
    <DashboardContainer>
      {isFetching ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <Spinner />
        </div>
      ) : (
        <>
          <DashboardHeader>{dep?.name}</DashboardHeader>
          <div className='px-4 xl:px-20'>
            <div className='flex justify-end items-center my-5'>
              <Button color='primary' onClick={() => router.back()} size='lg'>
                <ArrowRight />
                بازگشت
              </Button>
            </div>
            <div className=''>
              <DataTable emps={dep.employees} />
            </div>
          </div>
        </>
      )}
    </DashboardContainer>
  )
}

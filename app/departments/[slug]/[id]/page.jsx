'use client'

import { useQuery } from '@tanstack/react-query'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import { api } from '@/app/lib/api'
import Spinner from '@/components/Spinner'
import InfoItem from '@/components/InfoItem'
import { localize } from '@/app/lib/utils/localize'
import { Button } from '@nextui-org/react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const items = [
  {
    name: '۱۲/۱۸',
    تعداد: 4,
  },
  {
    name: '۱۲/۱۹',
    تعداد: 6,
  },
  {
    name: '۱۲/۲۰',
    تعداد: 3,
  },

  {
    name: '۱۲/۲۱',
    تعداد: 8,
  },

  {
    name: '۱۲/۲۲',
    تعداد: 1,
  },

  {
    name: '۱۲/۲۳',
    تعداد: 10,
  },
  {
    name: '۱۲/۲۴',
    تعداد: 4,
  },
]

export default function EmployeePage({ params }) {
  const router = useRouter()
  const { data, isFetching, isError } = useQuery({
    queryKey: ['employees'],
    queryFn: () => api.get(`employees/${params.id}`),
    refetchOnWindowFocus: false,
  })

  return (
    <DashboardContainer>
      {isFetching ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <Spinner />
        </div>
      ) : (
        <>
          <DashboardHeader>جزئیات کارمند</DashboardHeader>
          <div className='h-full p-5'>
            <div className='mb-10'>
              <div className='flex items-center justify-between mb-3'>
                <h2 className='text-2xl font-bold text-neutral-800'>اطلاعات شخص</h2>
                <Button color='primary' onClick={() => router.back()} size='lg'>
                  <ArrowRight />
                  بازگشت
                </Button>
              </div>
              <div className='flex flex-col gap-3'>
                <InfoItem
                  title={'نام'}
                  value={`${data.data.firstname} ${data.data.lastname}`}
                />
                <InfoItem title={'مسئولیت'} value={data.data.position} />
                <InfoItem
                  title={'تعداد کل وظایف'}
                  value={localize(data.data.cnt_referred)}
                />
                <InfoItem
                  title={'تعداد وظایف انجام شده'}
                  value={localize(data.data.cnt_done)}
                />
                <InfoItem
                  title={'تعداد وظایف عقب افتاده'}
                  value={localize(data.data.cnt_overdue)}
                />
              </div>
            </div>
            <hr />
            <div className='mt-10'>
              <div className='flex justify-center'>
                <LineChart
                  width={800}
                  height={400}
                  data={items}
                  className='py-8 pr-10 text-sm shadow-lg bg-white/70 rounded-xl'
                >
                  <CartesianGrid stroke='#ccc' strokeDasharray='6 6' />
                  <XAxis dataKey='name' tickMargin={10} />
                  <YAxis tickMargin={20} />
                  <Tooltip />
                  <Legend verticalAlign='bottom' height={36} />
                  <Line
                    type='monotone'
                    dataKey='تعداد'
                    stroke='#8884d8'
                    name='تعداد وظایف انجام شده'
                  />
                </LineChart>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardContainer>
  )
}

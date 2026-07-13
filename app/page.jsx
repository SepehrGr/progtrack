'use client'

import { useQuery } from '@tanstack/react-query'
import StatsCard from '@/components/Dashboard/StatsCard'
import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import { api } from './lib/api'
import { useSession } from 'next-auth/react'

const deps = [
  {
    name: 'حسابداری',
    manager_name: 'محمدرضا رمضانی',
    cnt_referred: 15,
    cnt_done: 9,
    slug: 'accounting',
  },
  {
    name: 'فنی',
    manager_name: 'اسماعیل مهجور',
    cnt_referred: 24,
    cnt_done: 21,
    slug: 'technical',
  },
  {
    name: 'مالی',
    manager_name: 'مصطفی بازیار',
    cnt_referred: 33,
    cnt_done: 25,
    slug: 'finance',
  },
  {
    name: 'منابع انسانی',
    manager_name: 'محمود دولت آبادی',
    cnt_referred: 10,
    cnt_done: 5,
    slug: 'treasury',
  },
]

export default function Home() {
  const session = useSession()
  const { data } = useQuery({
    queryKey: ['departments'],
    queryFn: () => api.get('/departments'),
    refetchOnWindowFocus: false,
  })

  console.log(session.data)

  return (
    <DashboardContainer>
      <DashboardHeader>داشبورد مدیریت</DashboardHeader>
      <div className='px-4 xl:px-20'>
        <div className='grid grid-cols-1 gap-8 py-8 md:gap-14 lg:gap-10 lg:grid-cols-2 xl:grid-cols-3'>
          {data?.data.map(dep => (
            <StatsCard key={dep.id} dep={dep} />
          ))}
          {/* {deps.map(dep => (
            <StatsCard key={dep.slug} dep={dep} />
          ))} */}
        </div>
      </div>
    </DashboardContainer>
  )
}

import Link from 'next/link'
import { Card, CardBody, CardHeader, CircularProgress } from '@nextui-org/react'
import { localize } from '@/app/lib/utils/localize'

export default function EmployeeCard({ emp }) {
  return (
    <Card className='text-white shadow-lg bg-stone'>
      <CardHeader className='flex flex-col gap-4 py-5 text-white bg-steel'>
        <h3 className='text-2xl font-bold'>
          {emp.firstname} {emp.lastname}
        </h3>
        <p className='text-lg text-white/70'>مسئولیت: {emp.position}</p>
      </CardHeader>
      <CardBody className='py-4 text-lg text-right text-gray-800 bg-gradient-to-b from-orange-300 to-orange-50'>
        <div className='flex gap-10 mb-5'>
          <div className='flex flex-col gap-4'>
            <div>نامه های وارده:</div>
            <div>نامه های انجام شده:</div>
            <div>تعداد وظایف عقب افتاده:</div>
            <div></div>
            <div>درصد کارهای انجام شده:</div>
          </div>
          <div className='flex flex-col items-center flex-grow gap-4'>
            <div className='font-bold'>{localize(emp.cnt_referred)}</div>
            <div className='font-bold'>{localize(emp.cnt_done)}</div>
            <div className='font-bold'>
              {localize(emp.cnt_referred - emp.cnt_done)}
            </div>
            <CircularProgress
              size='lg'
              showValueLabel
              color='secondary'
              aria-label='progress'
              value={Math.round((emp.cnt_done / emp.cnt_referred) * 100)}
              classNames={{
                svg: 'w-16 h-16',
                value: 'text-base'
              }}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

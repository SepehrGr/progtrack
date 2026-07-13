import Link from 'next/link'
import { Eye, UserRoundSearch } from 'lucide-react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
} from '@nextui-org/react'
import { localize } from '@/app/lib/utils/localize'

export default function StatsCard({ dep }) {
  return (
    <Card className='text-white shadow-lg bg-stone'>
      <CardHeader className='flex flex-col gap-2 py-5 text-white bg-steel'>
        <h3 className='text-xl font-bold'>{dep.name}</h3>
        <p className='text-lg text-white/70'>مسئول بخش: {dep.manager_name}</p>
      </CardHeader>
      <CardBody className='py-4 text-lg text-right text-gray-800 bg-gradient-to-b from-orange-300 to-orange-50'>
        <div className='flex gap-10 mb-5'>
          <div className='flex flex-col gap-2'>
            <div>نامه های وارده:</div>
            <div>نامه های انجام شده:</div>
            <div>تعداد وظایف عقب افتاده:</div>
            <div></div>
            <div className='mt-2'>درصد کارهای انجام شده:</div>
          </div>
          <div className='flex flex-col items-center flex-grow gap-2'>
            <div className='font-bold'>{localize(dep.cnt_referred)}</div>
            <div className='font-bold'>{localize(dep.cnt_done)}</div>
            <div className='font-bold'>
              {localize(dep.cnt_referred - dep.cnt_done)}
            </div>
            <CircularProgress
              size='lg'
              showValueLabel
              color='secondary'
              aria-label='progress'
              value={Math.round((dep.cnt_done / dep.cnt_referred) * 100)}
              classNames={{
                svg: 'w-16 h-16',
                value: 'text-base',
              }}
            />
          </div>
        </div>
        <div className='flex flex-col gap-3 lg:flex-row lg:justify-center'>
          <Button
            size='lg'
            className='flex items-center w-full text-white lg:text-lg bg-steel-600'
            as={Link}
            href={`/departments/${dep.id}`}
          >
            <UserRoundSearch className='ml-1' size={24} />
            نمایش کارکنان
          </Button>
          <Button
            size='lg'
            variant='bordered'
            className='flex items-center w-full lg:text-lg text-steel-600'
            as={Link}
            href={`/reports?dep=${dep.id}`}
          >
            <Eye className='ml-1' size={24} />
            مشاهده جزئیات
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

'use client'

import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { Button, Divider } from '@nextui-org/react'
import {
  Building2,
  CircleUserRound,
  FileBarChart,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  RefreshCw,
  Settings,
  UserRoundCog,
  X,
} from 'lucide-react'
import MenuItem from '../MenuItem'
import { sidebarAtom } from '@/app/lib/atoms/sidebarAtom'
import { signOut, useSession } from 'next-auth/react'

export default function Sidebar() {
  const { data } = useSession()
  const pathname = usePathname()
  const [isMenuOpen, setMenuOpen] = useAtom(sidebarAtom)

  const logout = () => {
    signOut({ callbackUrl: '/login' })
  }

  const className =
    'fixed top-0 bottom-0 right-0 z-40 max-h-screen px-3 pt-20 pb-8 text-white truncate transition-all duration-500 ease-in-out bg-primary-800'
  const appendClass = isMenuOpen ? 'w-[325px]' : 'w-[65px]'

  if (pathname === '/login') return null

  return (
    <>
      <div className={`${className} ${appendClass}`}>
        <Button
          variant='light'
          isIconOnly
          className='absolute px-0 ml-auto text-white rounded-full top-5 right-4.5'
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        <div className='flex items-center gap-1 pr-2'>
          <CircleUserRound size={28} className='inline-block ml-2' />
          {isMenuOpen && (
            <h2 className='text-xl'>{data && data.user.user_info.name}</h2>
          )}
        </div>
        <Divider
          orientation='horizontal'
          className='my-4 rounded-full bg-white/70 h-0.5'
        />
        <div className='flex flex-col gap-4'>
          <MenuItem
            name='داشبورد'
            route='/'
            icon={<LayoutDashboard size={25} />}
          />
          <MenuItem
            name='گزارش ها'
            route='/reports'
            icon={<FileBarChart size={25} />}
          />
          <MenuItem
            name='بروزرسانی اطلاعات از اتوماسیون'
            route='/update'
            icon={<RefreshCw size={25} />}
          />
          <MenuItem
            name='تنظیمات بخش و پرسنل سازمان'
            route='/orgsettings'
            icon={<Building2 size={25} />}
          />
          <div className='absolute right-4.5 bottom-5 flex flex-col gap-2 '>
            <MenuItem
              name='تنظیمات سامانه'
              fontSize='text-xl'
              route='/settings'
              icon={<Settings size={25} />}
            />
            <MenuItem
              name='خروج از سامانه'
              route=''
              fontSize='text-xl'
              icon={<LogOut size={25} />}
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </>
  )
}

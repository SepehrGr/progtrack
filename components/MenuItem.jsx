'use client'

import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { sidebarAtom } from '@/app/lib/atoms/sidebarAtom'
import Link from 'next/link'

export default function MenuItem({
  icon,
  name,
  route,
  onClick,
  className,
  fontSize
}) {
  const [isMenuOpen, setMenuOpen] = useAtom(sidebarAtom)
  const pathname = usePathname()
  const colorClass =
    pathname === route ? 'text-primary bg-white' : 'text-white/80 hover:text-white'

  return (
    <Link
      href={route}
      onClick={onClick}
      className={`flex gap-1 items-center [&>*]:my-auto text-md pl-6 p-2 rounded-lg ${colorClass} ${className}`}
    >
      <div className='ml-2'>{icon}</div>
      {isMenuOpen && <div className={`text-lg ${fontSize}`}>{name}</div>}
    </Link>
  )
}

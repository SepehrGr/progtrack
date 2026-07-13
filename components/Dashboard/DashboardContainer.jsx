'use client'

import { useAtom } from 'jotai'
import { sidebarAtom } from '@/app/lib/atoms/sidebarAtom'

export default function DashboardContainer({ children }) {
  const [isMenuOpen, setMenuOpen] = useAtom(sidebarAtom)
  const margin = isMenuOpen ? 'mr-[325px]' : 'mr-[65px]'

  return (
    <main
      className={`text-black min-h-screen bg-stone transition-[margin-right] ease-in-out duration-300 ${margin}`}
    >
      {children}
    </main>
  )
}

import Image from 'next/image'
import Container from '@/components/Container'
import Logo from '@/public/logo.svg'

export default function Header() {
  return (
    <header className='fixed z-20 w-full px-2 py-8 text-white sm:px-6 bg-primary-700'>
      <Container>
        <nav>
          <ul className='flex flex-col gap-6 md:flex-row'>
            <li>
              <a href='https://pgsez.ir'>وبسایت منطقه ویژه اقتصادی</a>
            </li>
          </ul>
        </nav>
        {/* Temporarily remove logo */}
        {/* <div className='absolute left-0 p-6 -translate-y-1/2 md:-translate-y-0 md:-translate-x-1/2 top-1/2 md:top-6 md:left-1/2 bg-primary-700 rounded-xl'>
          <Image src={Logo} alt='Special Zone Logo' width={75} height={75} />
        </div> */}
      </Container>
    </header>
  )
}

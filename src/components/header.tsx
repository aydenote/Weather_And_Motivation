import Link from 'next/link';
import Image from 'next/image'
import DarkModeToggleButton from './dark-mode-toggle-button';
import logoSrc from '../../public/logo.svg'

export default function Header() {
  return (
    <header className="text-gray-600 body-font dark:bg-slate-900">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Image width={50} height={50} src={logoSrc} alt='logo' />
          <span className="ml-3 text-xl">기분 좋은 날씨</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-gray-900">
            홈
          </Link>
          <Link href="/schedule" className="mr-5 hover:text-gray-900">
            일정
          </Link>
          <Link href="/analysis" className="mr-5 hover:text-gray-900">
            분석
          </Link>
          <Link href="/contact" className="mr-5 hover:text-gray-900">
            연락
          </Link>
        </nav>
        <DarkModeToggleButton />
      </div>
    </header>
  );
}

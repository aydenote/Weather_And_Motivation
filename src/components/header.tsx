import Link from 'next/link';
import Image from 'next/image'
import DarkModeToggleButton from './dark-mode-toggle-button';
import logoSrc from '../../public/logo.svg'

export default function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Image width={50} height={50} src={logoSrc} alt='logo' />
          <span className="ml-3 text-xl">날씨와 동기의 관계</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-gray-900">
            홈
          </Link>
          <Link href="/projects" className="mr-5 hover:text-gray-900">
            일정
          </Link>
          <Link href="/contact" className="mr-5 hover:text-gray-900">
            연락하기
          </Link>
        </nav>
        <DarkModeToggleButton />
      </div>
    </header>
  );
}

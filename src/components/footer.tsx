import Link from 'next/link'
import Image from 'next/image'
import blogSrc from '../../public/blog.svg'
import githubSrc from '../../public/github.svg'

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font dark:bg-slate-900">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-xl">오늘 날씨는 어떤가요?</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2023 ayden — project
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <Link href="https://velog.io/@aydenote" target='_blank' className="ml-3 text-gray-500">
            <Image width={20} height={20} src={blogSrc} alt='link to blog' className='w-5 h-5' />
          </Link>
          <Link href="https://github.com/aydenote" target='_blank' className="ml-3 text-gray-500">
            <Image width={20} height={20} src={githubSrc} alt='link to blog' className='w-5 h-5' />
          </Link>
        </span>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { ThemeProvider } from 'next-themes';
import { CallAnimation, EmailAnimation, BlogAnimation } from '../components/animation';
import Header from '../components/header';

export default function Contact() {
  return (
    <ThemeProvider>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <CallAnimation />
                <div className="p-6 bg-slate-100 dark:bg-slate-900">
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">전화번호</h1>
                  <p className="leading-relaxed mb-3">010-9460-1446</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <EmailAnimation />
                <div className="p-6 bg-slate-100 dark:bg-slate-900">
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">이메일</h1>
                  <p className="leading-relaxed mb-3">dslgpgh@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <BlogAnimation />
                <div className="p-6 bg-slate-100 dark:bg-slate-900">
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Blog</h1>
                  <p className="leading-relaxed mb-3">
                    <Link href="https://velog.io/@aydenote" target="_blank">
                      https://velog.io/@aydenote
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}

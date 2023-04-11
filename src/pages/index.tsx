import Head from 'next/head';
import Layout from '@/components/layout';
import Main from '@/components/home/main';
import { ThemeProvider } from 'next-themes';

export default function Home() {
  return (
    <ThemeProvider>
      <Layout>
        <Head>
          <title>Weather And Motivation</title>
          <meta name="description" content="날씨와 Todo 통계를 비교하여 날씨와 의욕의 관계를 확인할 수 있는 프로젝트입니다." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <Main />
          </div>
        </section>
      </Layout>
    </ThemeProvider>
  );
}

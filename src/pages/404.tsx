import { ThemeProvider } from 'next-themes';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { NotFoundAnimation } from '@/components/animation';


export default function PageNotFound() {
  return (
    <ThemeProvider>
      <Header />
      <NotFoundAnimation />
      <Footer />
    </ThemeProvider>
  )

}

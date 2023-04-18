import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/todo'
import '@/styles/globals.css'
import { useEffect } from 'react'


export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    localStorage.getItem('theme') ? null : localStorage.setItem('theme', 'light')
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
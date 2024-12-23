import type { AppProps } from 'next/app'
import { ThemeProvider } from '../app/contexts/ThemeContext'
import '../app/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp


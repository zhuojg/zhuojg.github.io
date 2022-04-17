import { BasicLayout } from '@/components/layout/basic'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-NED7X2ZRQ2" />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-NED7X2ZRQ2');
  `,
        }}
      />
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </>
  )
}

export default MyApp

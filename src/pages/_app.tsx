import { AppProps } from 'next/app'
import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import theme from 'styles/theme'
import Script from 'next/script'

function App({ Component, pageProps }: AppProps) {
  const GlobalStyleProxy: any = GlobalStyles
  const ThemeProxy: any = ThemeProvider

  return (
    <ThemeProxy theme={theme}>
      <Head>
        <title>React Avançado - Boilerplate</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
        />
      </Head>
      <Script
        type="text/javascript"
        src="https://static.zdassets.com/zendesk_app_framework_sdk/2.0/zaf_sdk.min.js"
      ></Script>
      <GlobalStyleProxy />
      <Component {...pageProps} />
    </ThemeProxy>
  )
}

export default App

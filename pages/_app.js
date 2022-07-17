import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux'

import Head from 'next/head'
import Header from '@components/Header/Header'
import reduxStore from '@tools/reduxStore'

import '@styles/globals.css'
import '@styles/fonts.css'

const App = ({ Component, store }) => {
  return (
    <Provider store={ store }>
      <Head>
        <title>오일러EDU</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        { /* for test */ }
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/eulerLogo/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="text/javascript"
          src={ `//dapi.kakao.com/v2/maps/sdk.js?appkey=${ process.env.kakaoApiKey }&libraries=services,clusterer` }
        />
      </Head>
      <Header />
      <Component />
    </Provider>
  )
}

export default withRedux(reduxStore)(App)

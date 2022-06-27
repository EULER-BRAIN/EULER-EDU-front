import Head from 'next/head'
import Layout from '@components/Management/Layout/Layout'
import Main from '@components/Management/Main'

export default function() {
  return (
    <div>
      <Head>
        <title>오일러EDU : 관리</title>
      </Head>
      <Layout page="main">
        <Main />
      </Layout>
    </div>
  )
}

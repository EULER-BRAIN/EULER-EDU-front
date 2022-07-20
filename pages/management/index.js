import Head from 'next/head'
import Layout from '@components/Management/Layout/Layout'
import Main from '@components/Management/Main/Main'

export default function() {
  return (
    <div>
      <Head>
        <title>관리 : 오일러EDU</title>
      </Head>
      <Layout page="main">
        <Main />
      </Layout>
    </div>
  )
}

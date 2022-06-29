import Head from 'next/head'
import Layout from '@components/ParentSystem/Layout/Layout'
import Main from '@components/ParentSystem/Main/Main'

export default function() {
  return (
    <div>
      <Head>
        <title>오일러EDU : 학부모 시스템</title>
      </Head>
      <Layout page="main">
        <Main />
      </Layout>
    </div>
  )
}

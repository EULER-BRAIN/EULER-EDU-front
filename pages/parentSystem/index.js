import Head from 'next/head'
import Layout from '@components/ParentSystem/Layout/Layout'
import Main from '@components/ParentSystem/Main/Main'

export default function() {
  return (
    <div>
      <Head>
        <title>학부모 시스템 : 오일러EDU</title>
      </Head>
      <Layout page="main">
        <Main />
      </Layout>
    </div>
  )
}

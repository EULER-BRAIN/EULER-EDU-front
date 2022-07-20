import Head from 'next/head'
import Layout from '@components/Management/Layout/Layout'
import Award from '@components/Management/Main/Award/Award'

export default function() {
  return (
    <div>
      <Head>
        <title>관리 : 오일러EDU</title>
      </Head>
      <Layout page="main/award">
        <Award />
      </Layout>
    </div>
  )
}

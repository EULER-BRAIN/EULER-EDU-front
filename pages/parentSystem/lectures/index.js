import Head from 'next/head'
import Layout from '@components/ParentSystem/Layout/Layout'
import Lectures from '@components/ParentSystem/Lectures/Lectures'

export default function() {
  return (
    <div>
      <Head>
        <title>관리 : 오일러EDU</title>
      </Head>
      <Layout page="lectures">
        <Lectures />
      </Layout>
    </div>
  )
}

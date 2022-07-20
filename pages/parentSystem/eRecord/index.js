import Head from 'next/head'
import Layout from '@components/ParentSystem/Layout/Layout'
import ERecord from '@components/ParentSystem/ERecord/ERecord'

export default function() {
  return (
    <div>
      <Head>
        <title>관리 : 오일러EDU</title>
      </Head>
      <Layout page="eRecord">
        <ERecord />
      </Layout>
    </div>
  )
}

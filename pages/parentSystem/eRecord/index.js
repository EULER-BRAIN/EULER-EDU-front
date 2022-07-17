import Head from 'next/head'
import Layout from '@components/ParentSystem/Layout/Layout'
import ERecord from '@components/ParentSystem/ERecord/ERecord'

export default function() {
  return <Layout page="main"/>
  return (
    <div>
      <Head>
        <title>오일러EDU : 관리</title>
      </Head>
      <Layout page="main">
        <ERecord />
      </Layout>
    </div>
  )
}

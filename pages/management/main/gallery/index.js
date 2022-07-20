import Head from 'next/head'
import Layout from '@components/Management/Layout/Layout'
import Gallery from '@components/Management/Main/Gallery/Gallery'

export default function() {
  return (
    <div>
      <Head>
        <title>관리 : 오일러EDU</title>
      </Head>
      <Layout page="main/gallery">
        <Gallery />
      </Layout>
    </div>
  )
}

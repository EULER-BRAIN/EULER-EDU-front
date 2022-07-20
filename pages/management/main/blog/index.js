import Head from 'next/head'
import Layout from '@components/Management/Layout/Layout'
import Blog from '@components/Management/Main/Blog/Blog'

export default function() {
  return (
    <div>
      <Head>
        <title>관리 : 오일러EDU</title>
      </Head>
      <Layout page="main/blog">
        <Blog />
      </Layout>
    </div>
  )
}

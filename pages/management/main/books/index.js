import Head from 'next/head'
import Layout from '@components/Management/Layout/Layout'
import Books from '@components/Management/Main/Books/Books'

export default function() {
  return (
    <div>
      <Head>
        <title>관리 : 오일러EDU</title>
      </Head>
      <Layout page="main/books">
        <Books />
      </Layout>
    </div>
  )
}

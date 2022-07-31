import Head from 'next/head'
import NoticeSet from '@components/Notice/NoticeSet'
import { useRouter } from 'next/router'

export default function() {
  const router = useRouter();
  
  return (
    <div>
      <Head>
        <title>오일러EDU</title>
      </Head>
      <NoticeSet id={ router.query.id } />
    </div>
  )
}

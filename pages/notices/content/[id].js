import Head from 'next/head'
import NoticeContent from '@components/Notice/NoticeContent'
import { useRouter } from 'next/router'

export default function() {
  const router = useRouter();
  
  return (
    <div>
      <Head>
        <title>오일러EDU</title>
      </Head>
      <NoticeContent id={ router.query.id } />
    </div>
  )
}

import Head from 'next/head'
import SubMain from '@components/Main/SubMain'
import { useRouter } from 'next/router'

export default function() {
  const router = useRouter();
  
  return (
    <div>
      <Head>
        <title>오일러EDU</title>
      </Head>
      <SubMain id={ router.query.id } />
    </div>
  )
}

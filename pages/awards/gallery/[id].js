import Head from 'next/head'
import Gallery from '@components/Awards/Gallery/Gallery'
import { useRouter } from 'next/router'

export default function() {
  const router = useRouter();
  
  return (
    <div className="ROOT">
      <Head>
        <title>어워드 : 오일러EDU</title>
      </Head>
      <Gallery id={ router.query.id } />
    </div>
  )
}

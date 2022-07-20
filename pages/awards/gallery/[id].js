import Head from 'next/head'
import Gallery from '@components/Awards/Gallery/Gallery'

export default function() {
  return (
    <div className="ROOT">
      <Head>
        <title>어워드 : 오일러EDU</title>
      </Head>
      <Gallery />
    </div>
  )
}

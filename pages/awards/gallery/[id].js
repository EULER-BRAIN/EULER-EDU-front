import Head from 'next/head'
import Gallery from '@components/Awards/Gallery/Gallery'

export default function() {
  return (
    <div className="ROOT">
      <Head>
        <title>오일러EDU : 어워드</title>
      </Head>
      <Gallery />
    </div>
  )
}

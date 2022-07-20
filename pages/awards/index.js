import Head from 'next/head'
import AwardsSet from '@components/Awards/AwardsSet/AwardsSet'

export default function() {
  return (
    <div>
      <Head>
        <title>어워드 : 오일러EDU</title>
      </Head>
      <AwardsSet />
    </div>
  )
}

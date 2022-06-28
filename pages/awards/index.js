import Head from 'next/head'
import AwardsSet from '@components/Awards/AwardsSet/AwardsSet'

export default function() {
  return (
    <div>
      <Head>
        <title>오일러EDU : 어워드</title>
      </Head>
      <AwardsSet />
    </div>
  )
}

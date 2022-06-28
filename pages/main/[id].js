import Head from 'next/head'
import SubMain from '@components/Main/SubMain'

export default function() {
  return (
    <div>
      <Head>
        <title>오일러EDU</title>
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c4b7dcec0d1c1c82b374d7191c33579f" />
      </Head>
      <SubMain />
    </div>
  )
}

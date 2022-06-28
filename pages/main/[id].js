import Head from 'next/head'
import SubMain from '@components/Main/SubMain'

export default function() {
  return (
    <div>
      <Head>
        <title>오일러EDU</title>
        <script
          type="text/javascript"
          src={ `//dapi.kakao.com/v2/maps/sdk.js?appkey=${ process.env.kakaoApiKey }&libraries=services,clusterer` }
        />
      </Head>
      <SubMain />
    </div>
  )
}

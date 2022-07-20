import Head from 'next/head'
import Logout from '@components/Login/Logout/Logout'

export default function() {
  return (
    <div>
      <Head>
        <title>로그아웃 : 오일러EDU</title>
      </Head>
      <Logout />
    </div>
  )
}

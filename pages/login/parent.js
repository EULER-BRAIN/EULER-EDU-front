import Head from 'next/head'
import ParentLogin from '@components/Login/Parent/ParentLogin'

export default function() {
  return (
    <div>
      <Head>
        <title>오일러EDU : 학부모 로그인</title>
      </Head>
      <ParentLogin />
    </div>
  )
}

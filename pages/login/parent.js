import Head from 'next/head'
import ParentLogin from '@components/Login/Parent/ParentLogin'

export default function() {
  return (
    <div>
      <Head>
        <title>학부모 로그인 : 오일러EDU</title>
      </Head>
      <ParentLogin />
    </div>
  )
}

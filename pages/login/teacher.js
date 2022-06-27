import Head from 'next/head'
import TeacherLogin from '@components/Login/Teacher/TeacherLogin'

export default function() {
  return (
    <div>
      <Head>
        <title>오일러EDU : 선생님 로그인</title>
      </Head>
      <TeacherLogin />
    </div>
  )
}

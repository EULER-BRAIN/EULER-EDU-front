import Head from 'next/head'
import TeacherLogin from '@components/Login/Teacher/TeacherLogin'

export default function() {
  return (
    <div>
      <Head>
        <title>선생님 로그인 : 오일러EDU</title>
      </Head>
      <TeacherLogin />
    </div>
  )
}

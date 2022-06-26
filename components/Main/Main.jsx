import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from './Layout'
import Gallery from './Gallery'
import Footer from '@components/Footer/Footer'

const Campus = () => {
  return (
    <RLayout>
      <Layout.Title>캠퍼스 바로가기</Layout.Title>
    </RLayout>
  )
}

const Awards = () => {
  return (
    <RLayout>
      <Layout.Title>어워드</Layout.Title>
    </RLayout>
  )
}

const Books = () => {
  return (
    <RLayout>
      <Layout.Title>오일러BOOKS</Layout.Title>
    </RLayout>
  )
}

const EulerTV = () => {
  return (
    <RLayout>
      <Layout.Title>오일러TV</Layout.Title>
    </RLayout>
  )
}

const Main = () => {
  return (
    <div>
      <HeaderEmpty />
      <Gallery />
      <Campus />
      <Awards />
      <Books />
      <EulerTV />
      <Footer />
    </div>
  )
}

export default Main
{/* 학원별 공지, 포스터 */}
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from './Layout'
import Gallery from './Gallery'
import Footer from '@components/Footer/Footer'

const Notice = () => {
  return (
    <RLayout>
      <Layout.Title>공지</Layout.Title>
    </RLayout>
  )
}

const Posters = () => {
  return (
    <RLayout>
      <Layout.Title>포스터</Layout.Title>
    </RLayout>
  )
}

const Main = () => {
  return (
    <div>
      <HeaderEmpty />
      <Gallery />
      <Notice />
      <Posters />
      <Footer />
    </div>
  )
}

export default Main
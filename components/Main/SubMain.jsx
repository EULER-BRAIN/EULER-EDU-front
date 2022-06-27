import { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from './Layout'
import Gallery from './Gallery'
import Footer from '@components/Footer/Footer'

const NoticeItem = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    height: '30px',
    lineHeight: '30px',
    paddingLeft: '8px',
    paddingRight: '8px',
    overflow: 'hidden',
    borderBottom: '1px solid rgb(206, 206, 206)',
    background: `rgba(120,120,120,${ isHover ? 0.1 : 0 })`,
    config: { duration: 100 }
  })

  return (
    <animated.div
      style={ style }
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
    >
      123
    </animated.div>
  )
}
const Notice = () => {
  return (
    <RLayout>
      <div style={{ height: '15px' }}/>
      <Layout.Title>공지</Layout.Title>
      <div style={{ height: '15px' }}/>
      <NoticeItem />
      <NoticeItem />
    </RLayout>
  )
}

const PosterItem = (props) => {
  const style = {
    width: '200px',
    height: '280px',
    overflow: 'hidden',
    border: '1px solid rgb(206, 206, 206)',
    borderRadius: '10px'
  }
  const styleImgCont = {
    width: '200px',
    height: '200px',
    background: 'rgb(200,200,200)'
  }
  const styleTitle = {
    paddingLeft: '10px', paddingRight: '10px',
    paddingTop: '10px'
  }
  const styleContent = {
    paddingLeft: '10px', paddingRight: '10px',
    paddingTop: '5px',
    fontSize: '14px',
    color: 'rgb(100,100,100)'
  }
  return (
    <div
      style={ style }
    >
      <div style={ styleImgCont }>
      </div>
      <div
        style={ styleTitle }
      >Title</div>
      <div style={ styleContent }>Content</div>
    </div>
  )
}
const Posters = () => {
  const posterList = [<PosterItem/>, <PosterItem/>, <PosterItem/>]

  return (
    <div>
      <RLayout>
        <div style={{ height: '15px' }}/>
        <Layout.Title>포스터</Layout.Title>
        <div style={{ height: '15px' }}/>
      </RLayout>
      <Layout.HorizontalScroll
        itemList={ posterList }
        itemWidth={ 202 }
        gap={ 10 }
        height={ 282 }
      />
    </div>
  )
}

const Main = () => {
  return (
    <div>
      <HeaderEmpty />
      <Gallery />
      공지는 글
      학원 찾아오는 길?
      강사 정보(인강 사이트 참고)
      수원 영통점임을 확인할 수 있는 방법?
      <Notice />
      <Posters />
      <Footer />
    </div>
  )
}

export default Main

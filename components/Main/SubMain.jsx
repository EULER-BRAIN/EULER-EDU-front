import { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from './Layout'
import Gallery from './Gallery'
import Footer from '@components/Footer/Footer'
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk'

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
      <Layout.Title padding>공지</Layout.Title>
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
        <Layout.Title padding>포스터</Layout.Title>
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

const Maps = (props) => {
  const coordinate = { lat: 37.2503893, lng: 127.0762224 };
  return (
    <RLayout>
      <Layout.Title padding>찾아오시는 길</Layout.Title>
      <div>
        <div>경기도 수원시 영통구 ~~</div>
        <div>031-123-1234</div>
      </div>
      <div style={{ height: '15px' }} />
      <div style={{
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid rgb(206,206,206)'
      }}>
        <Map
          center={ coordinate }
          style={{
            width: "100%",
            height: "450px",
          }}
          level={3}
        >
          <CustomOverlayMap position={ coordinate }>
            <div>영통점</div>
          </CustomOverlayMap>
        </Map>
      </div>
    </RLayout>
  )
}

const Main = () => {
  return (
    <div>
      <HeaderEmpty />
      <Gallery />
      <Notice />
      <Layout.SandwichLine />
      <Posters />
      <Layout.SandwichLine />
      <Maps />
      <Footer />
    </div>
  )
}

export default Main

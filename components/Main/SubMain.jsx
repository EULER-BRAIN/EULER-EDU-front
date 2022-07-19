import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import useCompWidth from '@components/Layout/useCompWidth'
import Layout from './Layout'
import Gallery from './Gallery'
import Footer from '@components/Footer/Footer'
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk'
import getS3ImgUrl from '@tools/getS3ImgUrl'
import axiosEDU from '@tools/axiosEDU'

import { FcPhone, FcGraduationCap } from 'react-icons/fc'

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

const MapChild = (props) => {
  const [isHover, setHover] = useState(false);
  const opacity = useSpring({
    opacity: isHover ? 1 : 0.7,
    config: { duration: 100 }
  }).opacity;

  return (
    <animated.div style={{
      width: '0px', height: '0px',
      position: 'relative',
      opacity: opacity
    }}>
      <div
        style={{
          position: 'absolute',
          bottom: '30px', left: 'calc(50% - 36px)',
          width: '70px', height: '70px',
          border: '1px solid rgb(120,120,120)',
          borderRadius: '36px',
          background: 'white',
          overflow: 'hidden'
        }}
        onMouseEnter={ () => setHover(true) }
        onMouseLeave={ () => setHover(false) }
      >
        <Image
          src={ getS3ImgUrl(`campus/${ props.id }.png`) }
          width={ 70 } height={ 70 }
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '0px', left: '-1px',
          width: '0px', height: '30px',
          borderRight: '2px solid rgb(120,120,120)'
        }}
      />
    </animated.div>
    
  )
}
const BtnNaverMap = (props) => {
  const style = {
    paddingTop: '8px',
    paddingBottom: '8px',
    textAlign: 'center',
    border: '1px solid gray',
  }
  return (
    <a
      href={ props.href }
      target="_blank"
      rel="noreferrer"
    >
      <div style={ style }>
        네이버 지도로 길찾기
      </div>
    </a>
  )
}
const MapDiv = (props) => {
  return (
    <div style={{
      position: 'relative'
    }}>
      <props.Icon style={{
        position: 'absolute',
        top: '0px', left: '0px',
        width: '18px', height: '18px'
      }}/>
      <div
        style={{
          marginLeft: '23px',
          lineHeight: '20px',
          fontSize: '15px'
        }}
        className="FLight"
      >
        { props.children }
      </div>
    </div>
  )
}
const Maps = (props) => {
  const contRef = useRef();
  const bodyWidth = useCompWidth(contRef);
  const coordinate = {
    lat: props.lat,
    lng: props.lng
  };

  const layRight = (
    <div>
      <MapDiv Icon={ FcGraduationCap }>{ props.address }</MapDiv>
      <MapDiv Icon={ FcPhone }>{ props.call }</MapDiv>
    </div>
  )
  const layRight2 = (
    <div>
      <BtnNaverMap href={ props.naverMapUrl } />
    </div>
  )
  const layLeft = (
    <div style={{
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid rgb(206,206,206)'
    }}>
      {
        props.lat && props.lng ? (
          <Map
            center={ coordinate }
            style={{
              width: "100%",
              height: "450px",
            }}
            level={3}
          >
            <CustomOverlayMap position={ coordinate }>
              <MapChild id={ props.id } />
            </CustomOverlayMap>
          </Map>
        ) : null
      }
    </div>
  )

  return (
    <RLayout>
      <div ref={ contRef } />
      <Layout.Title padding>찾아오시는 길</Layout.Title>
      {
        bodyWidth > 700 ? (
          <div style={{
            display: 'flex',
            gap: '16px'
          }}>
            <div style={{
              width: 'calc(100% - 316px)',
              position: 'relative'
            }}>
              { layLeft }
            </div>
            <div style={{
              width: '300px',
              position: 'relative'
            }}>
              { layRight }
              <div style={{ height: '15px' }} />
              { layRight2 }
            </div>
          </div>
        ) : (
          <div>
            { layRight }
            <div style={{ height: '15px' }} />
            { layLeft }
            <div style={{ height: '15px' }} />
            { layRight2 }
          </div>
        )
      }
    </RLayout>
  )
}

const Main = ({ id }) => {
  const [mapInfo, setMapInfo] = useState({});
  useEffect(() => {
    axiosEDU.get(`/main/${ id }`).then(({ data }) => {
      console.log(data);
      setMapInfo({
        address: data.campus.address,
        call: data.campus.call,
        lat: data.campus.lat,
        lng: data.campus.lng,
        naverMapUrl: undefined
      })
    })
  }, [id]);

  return (
    <div>
      <HeaderEmpty />
      <Gallery />
      <Notice />
      <Layout.SandwichLine />
      <Posters />
      <Layout.SandwichLine />
      <Maps
        id={ id }
        address={ mapInfo.address }
        call={ mapInfo.call }
        lat={ mapInfo.lat }
        lng={ mapInfo.lng }
        naverMapUrl={ mapInfo.naverMapUrl }
      />
      <Footer />
    </div>
  )
}

export default Main

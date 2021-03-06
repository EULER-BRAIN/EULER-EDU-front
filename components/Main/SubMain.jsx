import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import useCompWidth from '@components/Layout/useCompWidth'
import Layout from './Layout'
import Gallery from './Gallery'
import NoticeTable from '@components/Notice/NoticeTable'
import PosterMainItem from '@components/Poster/PosterMainItem'
import Footer from '@components/Footer/Footer'
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk'
import getS3ImgUrl from '@tools/getS3ImgUrl'
import LoadingDiv from '@components/Layout/Loading'
import axiosEDU from '@tools/axiosEDU'

import { FcPhone, FcGraduationCap } from 'react-icons/fc'

const Notice = (props) => {
  return (
    <RLayout>
      <Layout.Title padding>공지</Layout.Title>
      <Layout.BtnMore link={ `/notices/list/${ props.campus }` } />
      <NoticeTable
        notices={ props.notices }
        dateNow={ props.dateNow }
      />
    </RLayout>
  )
}

const Posters = (props) => {
  const posterList = props.posters.map((item, index) => (
    <PosterMainItem
      key={ index }
      id={ item._id }
      title={ item.title }
      content={ item.content }
      link={ item.link }
    />
  ));

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
          src={ getS3ImgUrl(`campus/${ props.id }`) }
          width={ 70 } height={ 70 }
          alt={ `campus/${ props.id }` }
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
  const [dateNow, setDateNow] = useState(null);
  const [notices, setNotices] = useState([]);
  const [posters, setPosters] = useState([]);
  const [mapInfo, setMapInfo] = useState({});
  useEffect(() => {
    if (id) {
      axiosEDU.get(`/main/${ id }`).then(({ data }) => {
        if (data.campus) {
          setNotices(data.notices);
          setPosters(data.posters);
          setMapInfo({
            address: data.campus.address,
            call: data.campus.call,
            lat: data.campus.lat,
            lng: data.campus.lng,
            naverMapUrl: undefined
          });
          setDateNow(data.dateNow)
        }
        else {
          // FIXME
        }
      })
    }
  }, [id]);

  return (
    <div>
      <HeaderEmpty />
      {
        !dateNow ? (
          <RLayout>
            <div style={{ height: '20px' }} />
            <LoadingDiv />
          </RLayout>
        ) : (
          <div>
            <Gallery />
            <Notice
              campus={ id }
              notices={ notices }
              dateNow={ dateNow }
            />
            <Layout.SandwichLine />
            <Posters
              campus={ id }
              posters={ posters }
              dateNow={ dateNow }
            />
            <Layout.SandwichLine />
            <Maps
              id={ id }
              address={ mapInfo.address }
              call={ mapInfo.call }
              lat={ mapInfo.lat }
              lng={ mapInfo.lng }
              naverMapUrl={ mapInfo.naverMapUrl }
            />
          </div>
        )
      }
      <Footer />
    </div>
  )
}

export default Main

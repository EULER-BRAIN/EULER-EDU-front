import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from './Layout'
import Gallery from './Gallery'
import useBodyWidth from '@components/Layout/useBodyWidth'
import useCompWidth from '@components/Layout/useCompWidth'
import Footer from '@components/Footer/Footer'
import axiosOJ from '@tools/axiosOJ'
import error from '@tools/error'

const Campus = () => {
  return (
    <RLayout>
      <div style={{ height: '15px' }}/>
      <Layout.Title>캠퍼스 바로가기</Layout.Title>
    </RLayout>
  )
}

const Awards = () => {
  return (
    <RLayout>
      <div style={{ height: '15px' }}/>
      <Layout.Title>어워드</Layout.Title>
    </RLayout>
  )
}

const BookItem = (props) => {
  const styleImgcontainer = {
    width: `${ props.width }px`,
    height: `${ props.width/4*3 }px`,
    background: 'rgb(200,200,200)'
  }
  const styleImg = {

  }
  return (
    <div style={{
      width: `${ props.width }px`
    }}>
      <div style={ styleImgcontainer }>
        <img style={ styleImg } />
      </div>
      <div style={{ height: '10px' }}/>
      <div className="FLight">{ props.name }</div>
    </div>
  )
}
const Books = () => {
  /* for test */
  const items = [{ name: '코딩마법서 1권 STONE' }, { name: '코딩마법서 C/C++ STONE' }];
  const contRef = useRef();
  const contWidth = useCompWidth(contRef);

  return (
    <RLayout>
      <div style={{ height: '15px' }}/>
      <Layout.Title>오일러BOOKS</Layout.Title>
      <div style={{ height: '15px' }}/>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }} ref={ contRef }>
        { items.map(item => <BookItem { ...item } width={ contWidth / 2 - 5 } />) }
      </div>
    </RLayout>
  )
}

const YotubeItem = (props) => {
  return (
    <div style={{
      width: `${ props.width }px`
    }}>
      <a
        href={ `https://youtu.be/${ props.id }` }
        target="_blank" rel="noreferrer"
      >
        <img
          src={ props.img }
          style={{
            width: props.width
          }}
        />
        <div>
          { props.title }
        </div>
      </a>
    </div>
  )
}
const EulerTV = () => {
  const [items, setItems] = useState([]);
  const contRef = useRef();
  const contWidth = useCompWidth(contRef);

  useEffect(() => {
    axiosOJ.get('/json/main/youtubelist').then(({ data }) => {
      const list = [];
      try {
        data.map((item, index) => {
          if (item.img.medium.url && item.yotubeId && item.title) {
            list.push({
              key: index,
              title: item.title,
              id: item.yotubeId,
              img: item.img.medium.url
            })
          }
        })
        setItems(list)
      } catch(e) {
        error(e)
      }
    })
  }, []);

  console.log(items)
  return (
    <RLayout>
      <div style={{ height: '15px' }}/>
      <Layout.Title>오일러TV</Layout.Title>
      <div style={{ height: '15px' }}/>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
        { items.map(item => <YotubeItem { ...item } width={ contWidth / 2 - 5 } />) }
      </div>
    </RLayout>
  )
}

const Main = () => {
  const bodyWidth = useBodyWidth();

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
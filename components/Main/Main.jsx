import { useEffect, useState } from 'react'
import Image from 'next/image'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from './Layout'
import Gallery from './Gallery'
import useBodyWidth from '@components/Layout/useBodyWidth'
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

const Books = () => {
  return (
    <RLayout>
      <div style={{ height: '15px' }}/>
      <Layout.Title>오일러BOOKS</Layout.Title>
    </RLayout>
  )
}

const YotubeItem = (props) => {
  return (
    <div style={{
      width: props.width
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
  const bodyWidth = useBodyWidth();

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
  });

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
        { items.map(item => <YotubeItem { ...item } width={ bodyWidth / 2 - 5 } />) }
      </div>
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
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from './Layout'
import Gallery from './Gallery'
import useBodyWidth from '@components/Layout/useBodyWidth'
import useCompWidth from '@components/Layout/useCompWidth'
import Footer from '@components/Footer/Footer'
import axiosOJ from '@tools/axiosOJ'
import error from '@tools/error'

const CampusItem = (props) => {
  const style = {
    position: 'relative',
    height: '70px', width: '170px',
    overflow: 'hidden'
  }
  const styleImgCont = {
    position: 'absolute',
    top: '0px', left: '0px',
    width: '70px', height: '70px',
    borderRadius: '35px',
    background: 'rgb(200,200,200)',
    overflow: 'hidden'
  }
  const styleBody = {
    position: 'absolute',
    top: '0px', bottom: '0px',
    left: '80px', right: '0px'
  }
  return (
    <div style={ style }>
      <Link href={ `/main/${ props.id }` }>
        <a>
          <div style={ styleImgCont }>
          </div>
        </a>
      </Link>
      <div style={ styleBody }>
        <Link href={ `/main/${ props.id }` }>
          <a>
            <div style={{
              fontSize: '15px',
              color: 'rgb(50,50,50)',
              lineHeight: '18px', height: '18px',
              paddingTop: '7px'
            }} className="FBold">수원 영통점</div>
            <div style={{
              fontSize: '13px',
              color: 'rgb(50,50,50)',
              wordBreak: 'keep-all',
              lineHeight: '16px', height: '32px',
              marginTop: '3px'
            }} className="FLight">경기 수원시 영통구 영통동</div>
          </a>
        </Link>
      </div>
    </div>
  )
}
const Campus = () => {
  const campusList = [<CampusItem id="yeongtong"/>, <CampusItem id="yeongtong"/>, <CampusItem id="yeongtong"/>, <CampusItem id="yeongtong"/>, <CampusItem id="yeongtong"/>, <CampusItem id="yeongtong"/>];
  return (
    <div>
      <RLayout>
        <div style={{ height: '15px' }}/>
        <Layout.Title>캠퍼스 바로가기</Layout.Title>
        <div style={{ height: '15px' }}/>
      </RLayout>
      <Layout.HorizontalScroll
        itemList={ campusList }
        itemWidth={ 170 }
        gap={ 10 }
        height={ 70 }
      />
    </div>
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
      <div style={{ height: '6px' }}/>
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
        { items.map(item => <BookItem { ...item } width={ contWidth / 2 - 7 } />) }
      </div>
    </RLayout>
  )
}

const YotubeItem = (props) => {
  return (
    <div style={{
      width: `${ props.width }px`,
      overflow: 'hidden'
    }}>
      <a
        href={ `https://youtu.be/${ props.id }` }
        target="_blank" rel="noreferrer"
      >
        <img
          src={ props.img }
          style={{
            width: `${ props.width }px`
          }}
        />
        <div style={{
          lineHeight: '19px', height: '57px',
          fontSize: '14px',
          overflow: 'hidden'
        }} className="FLight">
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

  return (
    <RLayout>
      <div style={{ height: '15px' }}/>
      <Layout.Title>오일러TV</Layout.Title>
      <div style={{ height: '15px' }}/>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: '14px'
      }} ref={ contRef }>
        { items.map(item => <YotubeItem { ...item } width={ contWidth / 2 - 7 } />) }
      </div>
    </RLayout>
  )
}

const Blogs = () => {
  return (
    <RLayout>
      <div style={{ height: '15px' }}/>
      <Layout.Title>오일러BLOG</Layout.Title>
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
      <Blogs />
      <Footer />
    </div>
  )
}

export default Main
{/* 학원별 공지, 포스터 */}
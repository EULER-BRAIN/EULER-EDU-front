import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from '@components/Layout/Link'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from './Layout'
import Gallery from './Gallery'
import useBodyWidth from '@components/Layout/useBodyWidth'
import useCompWidth from '@components/Layout/useCompWidth'
import getAwardWidth from '@components/Awards/AwardsSet/getAwardWidth'
import Footer from '@components/Footer/Footer'
import axiosOJ from '@tools/axiosOJ'
import axiosEDU from '@tools/axiosEDU'
import getS3ImgUrl from '@tools/getS3ImgUrl'
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
      <Link to={ `/main/${ props.id }` }>
        <div style={ styleImgCont }>
          <Image
            src={ getS3ImgUrl(`campus/${ props.id }.png`) }
            alt={ props.name }
            width={ 70 } height={ 70 }
          />
        </div>
      </Link>
      <div style={ styleBody }>
        <Link to={ `/main/${ props.id }` }>
          <div style={{
            fontSize: '15px',
            color: 'rgb(50,50,50)',
            lineHeight: '18px', height: '18px',
            paddingTop: '7px'
          }} className="FBold">{ props.name }</div>
          <div style={{
            fontSize: '13px',
            color: 'rgb(50,50,50)',
            wordBreak: 'keep-all',
            lineHeight: '16px', height: '32px',
            marginTop: '3px'
          }} className="FLight">{ props.add }</div>
        </Link>
      </div>
    </div>
  )
}
const Campus = (props) => {
  const campusList = props.items.map((item, index) => (
    <CampusItem
      key={ index }
      id={ item.id }
      name={ item.name }
      add={ item.add }
    />
  ))

  return (
    <div>
      <RLayout>
        <Layout.Title padding>캠퍼스 바로가기</Layout.Title>
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

const AwardItem = (props) => {
  const style = {
    width: `${ props.size }px`,
    height: `${ props.size }px`,
    background: 'rgb(200,200,200)',
    overflow: 'hidden'
  }
  return (
    <div style={ style }>
      <Link to={ `/awards/gallery/${ props.id }` }>
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative'
          }}>
          <Image
            src={ getS3ImgUrl(`awards/${ props.id }.png`) }
            alt={ `awards/${ props.id }` }
            layout="fill"
          />
        </div>
      </Link>
    </div>
  )
}
const Awards = (props) => {
  const contRef = useRef();
  const contWidth = useCompWidth(contRef);
  const itemWidth = getAwardWidth(contWidth);

  return (
    <RLayout>
      <Layout.Title padding>어워드</Layout.Title>
      <Layout.BtnMore link="/awards" />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
      }} ref={ contRef }>
        {
          props.items.map((item, index) => (
            <AwardItem
              key={ index }
              id={ item.id }
              size={ itemWidth }
            />
          ))
        }
      </div>
    </RLayout>
  )
}

const BookItem = (props) => {
  const styleImgcontainer = {
    width: `${ props.width }px`,
    height: `${ props.width/4*3 }px`,
    position: 'relative',
    background: 'rgb(200,200,200)'
  }
  return (
    <div style={{
      width: `${ props.width }px`,
      overflow: 'hidden'
    }}>
      <a
        href={ props.href }
        target="_blank"
        rel="noreferrer"
      >
        <div style={ styleImgcontainer }>
          <Image
            src={ getS3ImgUrl(`books/${ props.id }.png`) }
            layout="fill"
            objectFit="cover"
            alt={ `books/${ props.id }` }
          />
        </div>
        <div style={{ height: '6px' }}/>
        <div className="FLight">
          { props.name }
        </div>
      </a>
    </div>
  )
}
const Books = (props) => {
  /* for test */
  const contRef = useRef();
  const contWidth = useCompWidth(contRef);

  const body = (
    <>
      <Layout.Title padding>오일러BOOKS</Layout.Title>
      <Layout.BtnMore href="https://smartstore.naver.com/eulerbooks" />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: '14px'
      }} ref={ contRef }>
        { props.items.map((item, index) => (
          <BookItem
            key={ index }
            name={ item.name }
            href={ item.href }
            id={ item.id }
            width={ contWidth / 2 - 7 }
          />
        )) }
      </div>
    </>
  )
  return props.splited ? (
    <div>
      { body }
    </div>
  ) : (
    <RLayout>
      { body }
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
          alt={ `youtube/${ props.id }` }
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
const EulerTV = (props) => {
  const contRef = useRef();
  const contWidth = useCompWidth(contRef);

  const body = (
    <>
      <Layout.Title padding>오일러TV</Layout.Title>
      <Layout.BtnMore href="https://www.youtube.com/channel/UCQQJLCWcgAvrWRdZaxLUXJQ" />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: '14px'
      }} ref={ contRef }>
        {
          props.items.map((item, index) => (
            <YotubeItem
              { ...item }
              width={ contWidth / 2 - 7 }
              key={ index }
            />
          ))
        }
      </div>
    </>
  )
  return props.splited ? (
    <div>
      { body }
    </div>
  ) : (
    <RLayout>
      { body }
    </RLayout>
  )
}

const Blogs = () => {
  return (
    <RLayout>
      <Layout.Title padding>오일러BLOG</Layout.Title>
    </RLayout>
  )
}

const Main = () => {
  const bodyWidth = useBodyWidth();
  const [campusItems, setCampusItems] = useState([]);
  const [awardItems, setAwardItems] = useState([]);
  const [bookItems, setBookItems] = useState([]);
  const [youtubeItems, setYoutubeItems] = useState([]);

  useEffect(() => {
    axiosEDU.get('/main').then(({ data }) => {
      setCampusItems(data.campuses.map(item => {
        return {
          id: item.id,
          name: item.name,
          add: item.subname
        }
      }));
      setAwardItems(data.awards.map(item => {
        return {
          id: item._id
        }
      }));
      setBookItems(data.books.map(item => {
        return {
          name: item.name,
          id: item._id,
          href: item.url
        }
      }))
    });
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
        setYoutubeItems(list)
      } catch(e) {
        error(e)
      }
    })
  }, []);

  return (
    <div>
      <HeaderEmpty />
      <Gallery />
      <Campus items={ campusItems } />
      <Layout.SandwichLine />
      <Awards items={ awardItems } />
      <Layout.SandwichLine />
      {
        bodyWidth > 650 ? (
          <RLayout>
            <div style={{
              display: 'flex',
              gap: '30px'
            }}>
              <div style={{
                position: 'relative',
                width: 'calc(50% - 15px)'
              }}>
                <Books
                  items={ bookItems }
                  splited
                />
              </div>
              <div style={{
                position: 'relative',
                width: 'calc(50% - 15px)'
              }}>
                <EulerTV
                  items={ youtubeItems }
                  splited
                />
              </div>
            </div>
          </RLayout>
        ) : (
          <div>
            <Books items={ bookItems } />
            <Layout.SandwichLine />
            <EulerTV items={ youtubeItems } />
          </div>
        )
      }
      { /*<Layout.SandwichLine />
      <Blogs /> */ }
      <Footer />
    </div>
  )
}

export default Main

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSpring, animated } from 'react-spring'
import RLayout from '@components/Layout/RLayout'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import Footer from '@components/Footer/Footer'
import axiosEDU from '@tools/axiosEDU'
import LoadingDiv from '@components/Layout/Loading'

const Viewer = dynamic(
  () => import('../Layout/TuiViewer'),
  { ssr: false }
)

const ContentLink = (props) => {
  const [isHover, setHover] = useState(false);
  const styleBtn = useSpring({
    border: '1px solid rgb(206,206,206)',
    borderRadius: '3px',
    height: '30px',
    lineHeight: '30px',
    paddingLeft: '9px',
    paddingRight: '9px',
    fontSize: '13px',
    background: `rgba(200,200,200,${ isHover ? 0.2 : 0 })`,
    config: { duration: 100 }
  });

  return (
    <div style={{
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '20px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <a
        href={ props.link }
        target="_blank"
        rel="noreferrer"
      >
        <animated.div
          style={ styleBtn }
          onMouseEnter={ () => setHover(true) }
          onMouseLeave={ () => setHover(false) }
          className="ND"
        >
          해당 링크로 이동하기
        </animated.div>
      </a>
    </div>
  )
}

const Title = (props) => {
  const styleTitle = {
    fontFamily: 'NanumBarunGothicBold',
    fontSize: '21px',
    lineHeight: '25px'
  }
  return (
    <div>
      <div style={{ height: '15px' }} />
        <div style={ styleTitle }>
          { props.title }
        </div>
      <div style={{ height: '15px' }} />
      <div
        style={{
          borderBottom: '1px solid rgb(206,206,206)'
        }}
      />
    </div>
  )
}
const Content = (props) => {
  return (
    <div style={{
      paddingLeft: '10px',
      paddingRight: '10px'
    }}>
      <Viewer initialValue={props.content} />
    </div>
  )
}

const NoticeContent = ({ id }) => {
  const [notice, setNotice] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axiosEDU.get(`/main/notice/content/${ id }`).then(({ data }) => {
      if (data.notice) {
        setNotice(data.notice)
      }
      else {
        // FIXME
      }
    })
  }, [id]);

  return (
    <div>
      <HeaderEmpty />
        {
          notice ? (
            <RLayout>
              <Title
                title={ notice.title }
              />
              {
                notice.link ? (
                  <ContentLink
                    link={ notice.link }
                  />
                ) : (
                  <Content
                    content={ notice.content }
                  />
                )
              }
            </RLayout>
          ) : (
            <RLayout>
              <div style={{ height: '20px' }} />
              <LoadingDiv />
            </RLayout>
          )
        }
      <Footer padding />
    </div>
  )
}

export default NoticeContent

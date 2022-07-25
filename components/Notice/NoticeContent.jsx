import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import RLayout from '@components/Layout/RLayout'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import Footer from '@components/Footer/Footer'
import axiosEDU from '@tools/axiosEDU'
import LoadingDiv from '@components/Layout/Loading'

const Viewer = dynamic(
  () => import('../Layout/TuiViewer'),
  { ssr: false }
)

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
              <Content
                content={ notice.content }
              />
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

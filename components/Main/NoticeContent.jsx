import { useEffect, useState } from 'react'
import RLayout from '@components/Layout/RLayout'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import Footer from '@components/Footer/Footer'
import axiosEDU from '@tools/axiosEDU'
import LoadingDiv from '@components/Layout/Loading'

const Title = (props) => {

}
const Content = (props) => {

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
      <Footer />
    </div>
  )
}

export default NoticeContent

import { useState, useEffect } from 'react'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from '@components/Main/Layout'
import LoadingDiv from '@components/Layout/Loading'
import Footer from '@components/Footer/Footer'
import NoticeTable from './NoticeTable'
import PageSelector from '@components/Layout/PageSelector'
import { usePage } from '@tools/useSystemProp'
import axiosEDU from '@tools/axiosEDU'

const NoticeSet = ({ id }) => {
  const page = usePage();
  const [pageInfo, setPageInfo] = useState({});
  const [notices, setNotices] = useState(null);
  const [dateNow, setDateNow] = useState(null);

  useEffect(() => {
    if (notices) setNotices(null);
  }, [id, page]);
  useEffect(() => {
    if (!notices && id) {
      axiosEDU.post("/main/notice/list", { id, page }).then(({ data }) => {
        if (data.notices) {
          setNotices(data.notices)
          setPageInfo({
            page: data.page,
            maxPage: data.maxPage
          })
          setDateNow(data.dateNow)
        }
        else {
          // FIXME
        }
      })
    }
  }, [id, notices]);

  return (
    <div>
      <HeaderEmpty />
      <RLayout>
        <Layout.Title padding>공지</Layout.Title>
        {
          notices ? (
            <div>
              <NoticeTable
                notices={ notices }
                dateNow={ dateNow }
              />
              <div style={{ height: '15px' }} />
              <PageSelector
                page={ pageInfo.page }
                maxPage={ pageInfo.maxPage }
                makeLinkTo={ x => `/awards?page=${ x }` }
              />
            </div>
          ) : (
            <div>
              <div style={{ height: '10px' }} />
              <LoadingDiv />
            </div>
          )
        }
      </RLayout>
      <Footer />
    </div>
  )
}

export default NoticeSet;

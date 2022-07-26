import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from '@components/Main/Layout'
import Footer from '@components/Footer/Footer'
import Link from '@components/Layout/Link'
import useCompWidth from '@components/Layout/useCompWidth'
import getAwardWidth from '@components/Awards/AwardsSet/getAwardWidth'
import PageSelector from '@components/Layout/PageSelector'
import LoadingDiv from '@components/Layout/Loading'
import { usePage } from '@tools/useSystemProp'
import axiosEDU from '@tools/axiosEDU'
import getS3ImgUrl from '@tools/getS3ImgUrl'

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
          position: 'relative',
          width: '100%',
          height: '100%'
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

const AwardsSet = () => {
  const page = usePage();
  const [pageInfo, setPageInfo] = useState({});
  const [awards, setAwards] = useState(null);

  useEffect(() => {
    if (awards) setAwards(null);
  }, [page]);
  useEffect(() => {
    if (!awards) {
      axiosEDU.post("/main/award/list", { page }).then(({ data }) => {
        if (data.awards) {
          setAwards(data.awards)
          setPageInfo({
            page: data.page,
            maxPage: data.maxPage
          })
        }
        else {
          // FIXME
        }
      })
    }
  }, [awards]);

  const contRef = useRef();
  const contWidth = useCompWidth(contRef, [awards]);
  const itemWidth = getAwardWidth(contWidth);

  return (
    <div>
      <HeaderEmpty />
      <RLayout>
        <Layout.Title padding>어워드</Layout.Title>
        {
          awards ? (
            <div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }} ref={ contRef }>
                {
                  awards.map((item, index) => (
                    <AwardItem
                      key={ index }
                      id={ item._id }
                      size={ itemWidth }
                    />
                  ))
                }
              </div>
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

export default AwardsSet

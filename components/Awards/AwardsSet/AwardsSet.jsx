import { useRef } from 'react'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout'
import Layout from '@components/Main/Layout'
import Footer from '@components/Footer/Footer'
import Link from '@components/Layout/Link'
import useCompWidth from '@components/Layout/useCompWidth'
import getAwardWidth from '@components/Awards/AwardsSet/getAwardWidth'

const AwardItem = (props) => {
  const style = {
    width: `${ props.size }px`,
    height: `${ props.size }px`,
    background: 'rgb(200,200,200)',
    overflow: 'hidden'
  }
  return (
    <div style={ style }>
      <Link to="/awards/gallery/123">
        <div style={{ width: '100%', height: '100%' }}>
          123
        </div>
      </Link>
    </div>
  )
}

const AwardsSet = () => {
  const contRef = useRef();
  const contWidth = useCompWidth(contRef);
  const itemWidth = getAwardWidth(contWidth);

  return (
    <div>
      <HeaderEmpty />
      <RLayout>
        <Layout.Title padding>어워드</Layout.Title>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
        }} ref={ contRef }>
          <AwardItem size={ itemWidth } />
          <AwardItem size={ itemWidth } />
          <AwardItem size={ itemWidth } />
          <AwardItem size={ itemWidth } />
          <AwardItem size={ itemWidth } />
          <AwardItem size={ itemWidth } />
        </div>
      </RLayout>
      <Footer />
    </div>
  )
}

export default AwardsSet

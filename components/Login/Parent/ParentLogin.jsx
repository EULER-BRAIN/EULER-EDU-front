import { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import Footer from '@components/Footer/Footer'

const BtnSelect = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    width: '50%',
    height: '34px', lineHeight: '34px',
    textAlign: 'center',
    fontSize: '13px',
    color: 'rgb(50,50,50)',
    background: `rgba(120,120,120,${ isHover ? 0.1 : 0 })`,
    config: { duration: 100 }
  })

  return (
    <animated.div
      style={ style }
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
      className="FExtraLight BTNC"
    >
      { props.children }
    </animated.div>
  )
}
const ParentLogin = () => {
  const styleEuler = {
    textAlign: 'center',
    color: '#c2151c',
    fontSize: '26px'
  }
  const styleTitle = {
    textAlign: 'center',
    color: 'rgb(60,60,60)',
    fontSize: '20px',
    paddingBottom: '12px',
    borderBottom: '2px solid #c2151c'
  }

  return (
    <div>
      <HeaderEmpty />
      <div style={{
        marginLeft: '20px',
        marginRight: '20px'
      }}>
        <div style={{
          maxWidth: '280px',
          margin: 'auto'
        }}>
          <div style={{ height: '40px' }}/>
          <div style={ styleEuler } className="FBold">EULER</div>
          <div style={ styleTitle } className="FBold">학부모 로그인</div>
          <div style={{
            display: 'flex', position: 'relative',
            width: '100%', height: '34px',
            borderBottom: '2px solid #c2151c'
          }}>
            <BtnSelect>학부모 연락처로 로그인</BtnSelect>
            <BtnSelect>학생 정보로 로그인</BtnSelect>
          </div>
        </div>
      </div>
      <Footer padding />
    </div>
  )
}

export default ParentLogin

import { useSpring, animated } from 'react-spring'
import { useState } from 'react';
import HeaderEmpty from '@components/Header/HeaderEmpty'
import Footer from '@components/Footer/Footer'

const BtnLogin = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    height: '40px',
    lineHeight: '40px',
    borderRadius: '6px',
    background: isHover ? 'rgb(170,15,20)' : 'rgb(194,21,28)',
    color: 'white',
    textAlign: 'center',
    config: { duration: 100 }
  })

  return (
    <animated.div
      style={ style }
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
      className="BTNC"
    >
      로그인
    </animated.div>
  )
}
const TeacherLogin = () => {
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
  const styleIDCont = {
    height: '30px',
    border: '1px solid rgb(200,200,200)',
  }
  const styleId = {
    width: 'calc(100% - 20px)',
    height: '100%',
    border: 'none',
    outline: 'none',
    paddingLeft: '10px',
    paddingRight: '10px'
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
          <div style={ styleTitle } className="FBold">선생님 로그인</div>
          <div style={{ height: '20px' }} />
          <div style={{ marginLeft: '10px', marginRight: '10px' }}>
            <div style={ styleIDCont }>
              <input
                style={ styleId }
                type="txt"
                placeholder="아이디"
              />
            </div>
            <div style={{ height: '10px' }} />
            <div style={ styleIDCont }>
              <input
                style={ styleId }
                type="password"
                placeholder="비밀번호"
              />
            </div>
            <div style={{ height: '10px' }} />
            <BtnLogin />
          </div>
        </div>
      </div>
      <Footer padding />
    </div>
  )
}

export default TeacherLogin

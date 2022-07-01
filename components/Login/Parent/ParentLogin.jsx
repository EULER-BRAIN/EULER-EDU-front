import { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { Skeleton, Input } from '../Layout'

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

const LoginMod1 = (props) => {
  return (
    <div>
      <Input />
      mod1
    </div>
  )
}

const LoginMod2 = (props) => {
  return (
    <div>
      <Input />
      mod2
    </div>
  )
}

const ParentLogin = () => {
  return (
    <Skeleton
      subTitle="학부모 로그인"
    >
      <div style={{
        display: 'flex', position: 'relative',
        width: '100%', height: '34px',
        borderBottom: '2px solid #c2151c'
      }}>
        <BtnSelect>학부모 연락처로 로그인</BtnSelect>
        <BtnSelect>학생 정보로 로그인</BtnSelect>
      </div>
      <div style={{
        paddingTop: '20px',
        marginLeft: '10px',
        marginRight: '10px'
      }}>
        <LoginMod1 />
      </div>
    </Skeleton>
  )
}

export default ParentLogin

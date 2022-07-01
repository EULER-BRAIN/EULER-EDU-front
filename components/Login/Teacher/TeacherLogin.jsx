import { useSpring, animated } from 'react-spring'
import { useState } from 'react';
import { Skeleton, Input } from '../Layout'

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
  return (
    <Skeleton
      subTitle="선생님 로그인"
    >
      <div style={{
        paddingTop: '20px',
        marginLeft: '10px',
        marginRight: '10px'
      }}>
        <Input
          type="txt"
          placeholder="아이디"
        />
        <div style={{ height: '10px' }} />
        <Input
            type="password"
            placeholder="비밀번호"
        />
        <div style={{ height: '10px' }} />
        <BtnLogin />
      </div>
    </Skeleton>
  )
}

export default TeacherLogin

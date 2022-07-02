import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSpring, animated } from 'react-spring'
import { Skeleton, Input, BtnLogin } from '../Layout'

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
      onClick={ props.onClick }
    >
      { props.children }
    </animated.div>
  )
}

const LoginMod1 = (props) => {
  const router = useRouter();
  const onClick1 = () => {
    router.push('/parentSystem')
  }
  return (
    <div>
      <div>학부모 연락처</div>
      <div>01012341234</div>
      <Input />
      <div style={{ height: '10px' }} />
      <BtnLogin
        onClick={ onClick1 }
      >
        인증번호 받기
      </BtnLogin>
    </div>
  )
}

const LoginMod2 = (props) => {
  return (
    <div>
      <div>학생 이름</div>
      <Input />
      <div style={{ height: '10px' }} />
      <div>학생 생년월일</div>
      <Input />
      <div style={{ height: '10px' }} />
      <div>비밀번호</div>
      <Input />
      <div style={{ height: '10px' }} />
      <BtnLogin />
    </div>
  )
}

const ParentLogin = () => {
  const [page, setPage] = useState(1);
  return (
    <Skeleton
      subTitle="학부모 로그인"
    >
      <div style={{
        display: 'flex', position: 'relative',
        width: '100%', height: '34px',
        borderBottom: '2px solid #c2151c'
      }}>
        <BtnSelect onClick={ () => {
          if (page !== 1) setPage(1);
        } }>
          학부모 연락처로 로그인
        </BtnSelect>
        <BtnSelect onClick={ () => {
          if (page !== 2) setPage(2);
        } }>
          학생 정보로 로그인
        </BtnSelect>
      </div>
      <div style={{
        paddingTop: '20px',
        marginLeft: '10px',
        marginRight: '10px'
      }}>
        { page === 1 ? <LoginMod1 /> : <LoginMod2 /> }
      </div>
    </Skeleton>
  )
}

export default ParentLogin

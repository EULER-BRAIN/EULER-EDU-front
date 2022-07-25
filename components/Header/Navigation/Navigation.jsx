import { useSpring, animated } from 'react-spring'
import Link from '@components/Layout/Link'

import { MdClose, MdExitToApp, MdNavigateNext } from 'react-icons/md';

const Background = (props) => {
  const style = useSpring({
    position: 'absolute',
    top: '0px', left: '0px',
    width: '100%', height: '100%',
    background: `rgba(0,0,0,0.8)`,
    opacity: props.popup ? 1 : 0
  })

  return (
    <animated.div
      style={ style }
      onClick={ props.onClose }
    />
  )
}

const BarItem = (props) => {
  const style = {
    position: 'relative',
    marginLeft: '10px', marginRight: '10px',
    height: '30px',
    paddingBottom: '7px'
  }
  const styleText = {
    paddingLeft: '10px', paddingRight: '5px',
    height: '30px', lineHeight: '30px',
    fontSize: '16px'
  }
  const styleExit = {
    height: '16px',
    marginLeft: '3px',
    marginTop: '5px',
    verticalAlign: 'top',
    fill: 'rgb(120,120,120)'
  }
  const styleNextIcon = {
    position: 'absolute',
    right: '5px', top: '3px',
    width: '24px', height: '24px',
    fill: 'rgb(206,206,206)'
  }

  const body = (
    <div
      style={ style }
      onClick={ props.onClick }
    >
      <div
        style={ styleText }
        className="FLight"
      >
        { props.children }
        { props.newTab ?
          <MdExitToApp style={ styleExit } /> : null
        }
      </div>
      <MdNavigateNext style={ styleNextIcon } />
    </div>
  )
  if (props.link) {
    return (
      <Link to={ props.link }>
        { body }
      </Link>
    )
  }
  else {
    return (
      <a
        href={ props.href }
        target="_blank"
        rel="noreferrer"
      >
        { body }
      </a>
    )
  }
}
const Bar = (props) => {
  const style = useSpring({
    position: 'absolute',
    top: '0px',
    right: props.popup ? '0px' : '-300px',
    width: '300px', height: '100%',
    background: `white`,
    overflow: 'auto'
  })
  const styleLay1 = {
    position: 'relative',
    height: '50px'
  }
  const styleClose = {
    position: 'absolute',
    top: '12px', right: '12px',
    width: '26px', height: '26px'
  }
  const styleCloseIcon = {
    width: '100%', height: '100%',
    fill: 'rgb(70,70,70)'
  }
  const styleLine = {
    marginTop: '7px',
    height: '13px',
    borderTop: '1px solid rgb(206,206,206)',
  }
  const styleName = {
    paddingLeft: '20px',
    fontSize: '14px',
    color: 'gray'
  }
  const styleLogout = {
    position: 'absolute',
    bottom: '0px', right: '20px',
    fontSize: '14px',
    textDecoration: 'underline'
  }

  let bodyTop = (
    <div>
      { /*<BarItem
        link="/login/parent"
        onClick={ props.onClose }
      >학부모 로그인</BarItem> */ }
      <BarItem
        link="/login/teacher"
        onClick={ props.onClose }
      >선생님 로그인</BarItem>
      <div style={ styleLine } />
    </div>
  )
  if (props.loginInfo?.isTeacher) {
    bodyTop = (
      <div>
        <div style={{ position: 'relative' }}>
          <div style={ styleName }>
            { props.loginInfo?.name } 님
          </div>
          <Link to="/login/logout">
            <div
              style={ styleLogout }
              onClick={ props.onClose }
            >
              로그아웃
            </div>
          </Link>
        </div>
        <div style={ styleLine } />
        <BarItem
          link="/management"
          onClick={ props.onClose }
        >학원 관리 시스템</BarItem>
      </div>
    );
  }

  let bodyBottom = null;
  /*if (props.loginInfo?.isLogined) {
    bodyBottom = (
      <div>
        <div style={ styleLine } />
      </div>
    );
  }*/

  return (
    <animated.div style={ style }>
      <div style={ styleLay1 }>
        <div
          style={ styleClose }
          onClick={ props.onClose }
          className="BTNC"
        >
          <MdClose style={ styleCloseIcon } />
        </div>
      </div>
      { bodyTop }
      <BarItem
        link="/awards"
        onClick={ props.onClose }
      >어워드</BarItem>
      <BarItem
        href="https://smartstore.naver.com/eulerbooks"
        onClick={ props.onClose }
        newTab
      >오일러BOOKS</BarItem>
      <BarItem
        href="https://www.youtube.com/channel/UCQQJLCWcgAvrWRdZaxLUXJQ"
        onClick={ props.onClose }
        newTab
      >오일러TV</BarItem>
      <BarItem
        href="https://euleroj.io/"
        onClick={ props.onClose }
        newTab
      >오일러OJ</BarItem>
      { bodyBottom }
      <div style={{ height: '70px' }} />
    </animated.div>
  )
}

const Navigation = (props) => {
  return (
    <div style={{
      position: 'fixed',
      top: '0px', left: '0px',
      width: '100%', height: '100%',
      pointerEvents: props.popup ? "auto" : "none",
      zIndex: 110
    }}>
      <Background
        popup={ props.popup }
        onClose={ props.onClose }
      />
      <Bar
        loginInfo={ props.loginInfo }
        popup={ props.popup }
        onClose={ props.onClose }
      />
    </div>
  )
}

export default Navigation

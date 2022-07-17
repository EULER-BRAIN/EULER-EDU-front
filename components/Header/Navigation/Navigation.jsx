import { useSpring, animated } from 'react-spring'
import Link from '@components/Layout/Link'

import IconClose from '@material-ui/icons/Close';

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
    marginLeft: '10px', marginRight: '10px',
    height: '30px'
  }
  const styleText = {
    paddingLeft: '5px', paddingRight: '5px',
    height: '30px', lineHeight: '30px',
    fontSize: '16px'
  }
  const body = (
    <div
      style={ style }
      onClick={ props.onClick }
    >
      <div
        style={ styleText }
        className="FLight"
      >{ props.children }</div>
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

  return (
    <animated.div style={ style }>
      <div style={ styleLay1 }>
        <div
          style={ styleClose }
          onClick={ props.onClose }
          className="BTNC"
        >
          <IconClose style={ styleCloseIcon } />
        </div>
      </div>
      <BarItem
        link="/login/parent"
        onClick={ props.onClose }
      >학부모 로그인</BarItem>
      <BarItem
        link="/login/teacher"
        onClick={ props.onClose }
      >선생님 로그인</BarItem>
      <BarItem
        link="/awards"
        onClick={ props.onClose }
      >어워드</BarItem>
      <BarItem
        href="https://smartstore.naver.com/eulerbooks"
        onClick={ props.onClose }
      >오일러BOOKS</BarItem>
      <BarItem
        href="https://www.youtube.com/channel/UCQQJLCWcgAvrWRdZaxLUXJQ"
        onClick={ props.onClose }
      >오일러TV</BarItem>
      <BarItem
        href="https://euleroj.io/"
        onClick={ props.onClose }
      >오일러OJ</BarItem>
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
        popup={ props.popup }
        onClose={ props.onClose }
      />
    </div>
  )
}

export default Navigation

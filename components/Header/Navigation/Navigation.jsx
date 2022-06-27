import { useSpring, animated } from 'react-spring'
import Link from 'next/link'

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
      <Link href={ props.link }>
        <a>{ body }</a>
      </Link>
    )
  }
  else {
    return (
      <a href={ props.href }>
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

  return (
    <animated.div style={ style }>
      <div onClick={ props.onClose }>close</div>
      <BarItem
        link="/login/parent"
        onClick={ props.onClose }
      >학부모 로그인</BarItem>
      <BarItem
        link="/login/teacher"
        onClick={ props.onClose }
      >선생님 로그인</BarItem>
      <BarItem
        href={ '' }
        onClick={ props.onClose }
      >축하합니다</BarItem>
      <BarItem
        href={ '' }
        onClick={ props.onClose }
      >오일러BOOKS</BarItem>
      <BarItem
        href={ '' }
        onClick={ props.onClose }
      >오일러TV</BarItem>
      <BarItem
        href={ '' }
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

import { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import HeaderEmpty from '@components/Header/HeaderEmpty'
import Footer from '@components/Footer/Footer'

const Skeleton = (props) => {
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
          <div style={ styleTitle } className="FBold">
            { props.subTitle }
          </div>
          <div style={{
            position: 'relative'
          }}>
            { props.children }
          </div>
        </div>
      </div>
      <Footer padding />
    </div>
  )
}

const Input = (props) => {
  const styleCont = {
    height: '30px',
    border: '1px solid rgb(200,200,200)',
  }
  const styleInput = {
    width: 'calc(100% - 20px)',
    height: '100%',
    border: 'none',
    outline: 'none',
    paddingLeft: '10px',
    paddingRight: '10px'
  }
  return (
    <div style={ styleCont }>
      <input
        style={ styleInput }
        type={ props.type }
        placeholder={ props.placeholder }
      />
    </div>
  )
}
Input.defaultProps = {
  type: 'txt',
  placeholder: ''
}

const BtnLogin = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    height: '40px',
    lineHeight: '40px',
    borderRadius: '6px',
    background: isHover || props.unable ? 'rgb(170,15,20)' : 'rgb(194,21,28)',
    color: 'white',
    textAlign: 'center',
    config: { duration: 100 }
  })

  const onClick = () => {
    if (!props.unable) {
      props.onClick();
    }
  }

  return (
    <animated.div
      style={ style }
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
      className="BTNC"
      onClick={ onClick }
    >
      { props.children }
    </animated.div>
  )
}
BtnLogin.defaultProps = {
  children: '로그인',
  onClick: () => {}
}

export { Skeleton, Input, BtnLogin }

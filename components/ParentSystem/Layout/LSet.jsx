import { useState } from "react";
import { useSpring, animated } from "react-spring";

const Title = (props) => {
  return (
    <div>
      <div style={{
        lineHeight: '21px',
        paddingBottom: '10px',
        borderBottom: '2px solid #c2151c',
        color: '#c2151c',
        fontSize: '17px'
      }} className="FRegular">
        { props.children }
      </div>
      <div style={{ height: '10px' }} />
    </div>
  )
}

const Content = (props) => {
  return (
    <div style={{
      paddingLeft: '10px',
      paddingRight: '10px'
    }}>
      <div style={{
        position: 'relative'
      }}>
        { props.children }
      </div>
    </div>
  )
}

const BtmEmpty = () => {
  return (
    <div style={{ height: '30px' }} />
  )
}

const TopFlexBtn = (props) => {
  const [isHover, setHover] = useState(false);
  const styleBtn = useSpring({
    border: '1px solid rgb(206,206,206)',
    borderRadius: '3px',
    height: '30px',
    lineHeight: '30px',
    paddingLeft: '9px',
    paddingRight: '9px',
    fontSize: '14px',
    background: `rgba(200,200,200,${ isHover ? 0.2 : 0 })`,
    config: { duration: 100 }
  });

  return (
    <animated.div
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
      style={ styleBtn }
      className="BTNC ND"
    >
      어워드 추가
    </animated.div>
  )
}

export { Title, Content, BtmEmpty, TopFlexBtn }

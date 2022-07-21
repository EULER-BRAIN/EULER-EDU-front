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
      onClick={ props.onClick }
      style={ styleBtn }
      className="BTNC ND"
    >
      { props.children }
    </animated.div>
  )
}
TopFlexBtn.defaultProps = {
  onClick: () => {}
}

const TopFlexText = (props) => {
  const style = {
    height: '20px',
    lineHeight: '20px',
    fontSize: '15px'
  }
  return (
    <div style={ style }>
      { props.children }
    </div>
  )
}

const TopFlexTag = (props) => {
  const style = {
    height: '20px',
    lineHeight: '20px',
    paddingLeft: '5px',
    paddingRight: '5px',
    borderRadius: '4px',
    background: 'rgba(194,21,28,0.5)',
    fontSize: '13px',
    color: 'white'
  }
  const styleText1 = {
    fontSize: '12px',
    paddingRight: '3px',
    color: 'gray'
  }
  return (
    <div style={ style }>
      <span style={ styleText1 }>
        { props.tagName }
      </span>
      { props.children }
    </div>
  )
}
const TopFlexSaved = (props) => {
  const style = {
    width: '18px',
    height: '18px',
    borderRadius: '10px',
    background: props.token ? '#81c147' : 'rgba(194,21,28,0.5)',
  }

  return (
    <div style={ style }>

    </div>
  )
}

const TopInput = (props) => {
  const styleCont = {
    position: 'relative',
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
        value={ props.value }
        onChange={ (e) => props.onChange(e.target.value) }
      />
    </div>
  )
}
TopInput.defaultProps = {
  type: 'txt',
  placeholder: '',
  onChange: () => {},
}

export {
  Title,
  Content,
  BtmEmpty,
  TopFlexBtn,
  TopFlexText,
  TopFlexTag,
  TopFlexSaved,
  TopInput
}

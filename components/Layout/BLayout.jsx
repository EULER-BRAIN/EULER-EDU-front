import { useState, useRef, useMemo } from 'react';
import { useSpring, animated } from 'react-spring'
import Link from '@components/Layout/Link';
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout';
import Footer from '@components/Footer/Footer'
import useBodyWidth from '@components/Layout/useBodyWidth'

import { VscChevronDown } from 'react-icons/vsc'

const NaviListBtn = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    background: `rgba(120,120,120,${ isHover ? 0.1 : 0 })`,
    config: { duration: 100 }
  })
  const styleText = {
    height: '30px', lineHeight: '30px',
    color: 'rgb(70,70,70)',
    paddingLeft: '15px'
  }

  return (
    <Link
      to={ props.link }
      href={ props.href }
    >
      <animated.div
        onMouseEnter={ () => setHover(true) }
        onMouseLeave={ () => setHover(false) }
        className="BTNC"
        style={ style }
      >
        <div style={ styleText } className="FLight">- { props.name }</div>
      </animated.div>
    </Link>
  )
}
const NaviListItem = (props) => {
  let selected = useMemo(() => {
    for(const item of props.list) {
      if (item.id === props.page) return true
    }
    return false
  }, [props.list, props.page]);
  const [isOpen, setOpen] = useState(selected);
  const [isHover, setHover] = useState(false);

  const style = useSpring({
    position: 'relative',
    height: isOpen ? `${ 50 + 30 * props.list.length }px` : '40px',
    overflow: 'hidden',
    borderBottom: '1px solid rgb(206, 206, 206)',
  })
  const styleTop = useSpring({
    height: '40px',
    overflow: 'hidden',
    background: `rgba(120,120,120,${ isHover ? 0.1 : 0 })`,
    config: { duration: 100 }
  })
  const styleTopText = {
    height: '40px', lineHeight: '40px',
    paddingLeft: '10px'
  }
  const styleBtn = useSpring({
    position: 'absolute',
    top: '7px', right: '7px',
    widht: '26px', height: '26px',
    transform: `rotate(${ isOpen ? -180 : 0 }deg)`
  })
  const styleBtnIcon = {
    width: '100%', height: '100%',
    fill: 'rgb(130,130,130)'
  }

  return (
    <animated.div
      style={ style }
    >
      <animated.div
        style={ styleTop }
        onMouseEnter={ () => setHover(true) }
        onMouseLeave={ () => setHover(false) }
        onClick={ () => setOpen(!isOpen) }
        className="BTNC"
      >
        <div style={ styleTopText }>{ props.name }</div>
        <animated.div style={ styleBtn }>
          <VscChevronDown style={ styleBtnIcon } />
        </animated.div>
      </animated.div>
      { props.list.map((item, index) => (
        <NaviListBtn { ...item } key={ index } />
      )) }
    </animated.div>
  )
}
const NaviLeft = (props) => {
  const styleTop = {
    lineHeight: '21px',
    fontSize: '17px',
    color: '#c2151c',
    paddingBottom: '10px',
    borderBottom: '2px solid #c2151c',
  }
  return (
    <div
      style={{ width: '270px' }}
      className="ND"
    >
      <div style={{
        paddingLeft: '20px',
        width: '250px',
        position: 'relative'
      }}>
        <div style={ styleTop } className="FBold">{ props.name }</div>
        { props.list.map((item, index) => {
          return (
            <NaviListItem
              name={ item.name }
              list={ item.list }
              key={ index }
            />
          )
        }) }
      </div>
    </div>
  )
}

const NaivMobileBtn = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    fontSize: '15px',
    paddingTop: '3px', paddingBottom: '3px',
    paddingLeft: '4px', paddingRight: '4px',
    color: 'rgb(30,30,30)',
    background: `rgba(120,120,120,${ isHover ? 0.1 : 0 })`,
    borderRadius: '5px',
    config: { duration: 100 }
  })
  return (
    <Link
      to={ props.link }
      href={ props.href }
    >
      <animated.div
        style={ style }
        onMouseEnter={ () => setHover(true) }
        onMouseLeave={ () => setHover(false) }
      >
        { props.name }
      </animated.div>
    </Link>
  )
}
const NaivMobileItem = (props) => {
  const styleText = {
    fontSize: '13px',
    paddingBottom: '3px',
    color: 'rgb(100,100,100)'
  }

  return (
    <div>
      <div style={ styleText }>{ props.name }</div>
      { props.list.map((item, index) => <NaivMobileBtn { ...item } key={ index } />) }
      <div style={{ height: '10px' }} />
    </div>
  )
}
const NaivMobile = (props) => {
  const [isOpen, setOpen] = useState(true);
  const bodyRef = useRef();

  const style = {
    background: '#f3f3f3',
    borderBottom: '1px solid rgb(206, 206, 206)',
    overflow: 'hidden'
  }
  const styleBody = useSpring({
    height: isOpen ? `${ 30 + (bodyRef.current ? bodyRef.current.clientHeight : 0) }px` : '30px',
    overflow: 'hidden'
  })
  const styleTop = {
    color: 'rgb(100,100,100)',
    height: '30px', lineHeight: '30px',
    fontSize: '12px'
  }
  const styleBtnOpen = {
    position: 'absolute',
    top: '0px', right: '0px'
  }
  return (
    <div
      style={ style }
      className="ND"
    >
      <HeaderEmpty />
      <animated.div style={ styleBody }>
        <RLayout>
          <div style={{ position: 'relative' }}>
            <div style={ styleTop } className="FLight">{ props.name }</div>
            <div style={ styleBtnOpen } onClick={ () => setOpen(!isOpen) }>open/close</div>
            <div ref={ bodyRef }>
              <div style={{ height: '5px' }}/>
              { props.list.map((item, index) => (
                <NaivMobileItem 
                  name={ item.name }
                  list={ item.list }
                  key={ index }
                />
              )) }
            </div>
          </div>
        </RLayout>
      </animated.div>
    </div>
  )
}

const BLayout = (props) => {
  const bodyWidth = useBodyWidth();

  return (
    <div>
      { 
        bodyWidth >= 910 ? (
          <div>
            <HeaderEmpty />
            <div style={{ height: '20px' }} />
            <div style={{
              width: '100%',
              display: 'flex'
            }}>
              <NaviLeft
                name={ props.naviName }
                list={ props.naviList }
              />
              <div style={{
                width: 'calc(100% - 270px)'
              }}>
                <div style={{
                  marginLeft: '20px',
                  marginRight: '20px'
                }}>
                  <div style={{
                    maxWidth: '900px',
                    margin: 'auto'
                  }}>
                    { props.children }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <NaivMobile
              name={ props.naviName }
              list={ props.naviList }
            />
            <div style={{ height: '15px' }}/>
            <RLayout>
              { props.children }
            </RLayout>
          </div>
        )
      }
      <Footer padding />
    </div>
  )
}

BLayout.defaultProps = {
  naviName: "",
  naviList: [],
  children: null,
}

export default BLayout

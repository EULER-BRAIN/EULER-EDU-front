import { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring'
import HeaderEmpty from '@components/Header/HeaderEmpty'
import RLayout from '@components/Layout/RLayout';
import Footer from '@components/Footer/Footer'
import useBodyWidth from '@components/Layout/useBodyWidth'

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
    <animated.div
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
      className="BTNC"
      style={ style }
    >
      <div style={ styleText } className="FLight">- { props.name }</div>
    </animated.div>
  )
}
const NaviListItem = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [isHover, setHover] = useState(false);

  const style = useSpring({
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
      </animated.div>
      { props.list.map((item, index) => <NaviListBtn { ...item } key={ index } />) }
    </animated.div>
  )
}
const NaviLeft = (props) => {
  const styleTop = {
    fontSize: '17px',
    color: '#c2151c',
    paddingBottom: '10px',
    borderBottom: '2px solid #c2151c',
  }
  return (
    <div style={{ width: '270px' }}>
      <div style={{
        paddingLeft: '20px',
        width: '250px',
        position: 'relative'
      }}>
        <div style={ styleTop } className="FBold">학원 관리</div>
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
    <animated.div
      style={ style }
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
    >
      { props.children }
    </animated.div>
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
      { props.list.map((item, index) => {
        return (
          <NaivMobileBtn>
            { item.name }
          </NaivMobileBtn>
        )
      }) }
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
    <div style={ style }>
      <HeaderEmpty />
      <animated.div style={ styleBody }>
        <RLayout>
          <div style={{ position: 'relative' }}>
            <div style={ styleTop } className="FLight">학원 관리</div>
            <div style={ styleBtnOpen } onClick={ () => setOpen(!isOpen) }>open/close</div>
            <div ref={ bodyRef }>
              <div style={{ height: '5px' }}/>
              { props.list.map((item, index) => <NaivMobileItem { ...item } key={ index } />) }
            </div>
          </div>
        </RLayout>
      </animated.div>
    </div>
  )
}

const Layout = (props) => {
  const bodyWidth = useBodyWidth();
  
  const list = [
    {
      name: '사이트 회원 관리',
      list: [
        { name: '월별 접속수', link: '/' },
        { name: '신규회원', link: '/' },
      ]
    },
    {
      name: '사이트 회원 관리',
      list: [
        { name: '월별 접속수', link: '/' },
        { name: '신규회원', link: '/' },
      ]
    }
  ]

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
              <NaviLeft list={ list } />
              <div style={{
                width: 'calc(100% - 270px)'
              }}>
                <div style={{
                  marginLeft: '20px',
                  marginRight: '20px'
                }}>
                  <div style={{
                    maxWidth: '900px',
                    margin: 'auto',
                    background: 'gray'
                  }}>
                    123
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <NaivMobile list={ list } />
            <div style={{ height: '15px' }}/>
            <RLayout>
              123
            </RLayout>
          </div>
        )
      }
      <Footer/>
    </div>
  )
}

export default Layout

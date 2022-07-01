import { useRef, useState } from "react"
import { animated, useSpring } from 'react-spring'
import useCompWidth from "@components/Layout/useCompWidth"

const HeaderItem = (props) => {
  return (
    <div style={{
      textAlign: 'center',
      fontSize: '13px',
      color: 'rgb(100,100,100)',
      paddingBottom: '2px'
    }}>
      { props.text }
    </div>
  )
}

const Day = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    background: `rgba(120,120,120,${ isHover ? 0.1 : 0 })`,
    config: { duration: 100 }
  })
  const styleDay = {
    height: '18px',
    lineHeight: '18px',
    textAlign: 'center',
    fontSize: '15px'
  }

  return (
    <animated.div
      style={ style }
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
    >
      <div style={{ height: '6px' }} />
      <div style={ styleDay }>12</div>
      <div style={{ height: '25px' }}>
      </div>
    </animated.div>
  )
}

const WeekLine = (props) => {
  const style = {
    display: 'flex',
    borderTop: props.borderTop
  }
  return (
    <div style={ style }>
      { props.list.map((item, index) => {
        return (
          <div style={{
            width: 'calc(100% / 7)',
            position: 'relative'
          }} key={ index }>
            { item }
          </div>
        )
      }) }
    </div>
  )
}

const Calendar = (props) => {
  const contRef = useRef();
  const contWidth = useCompWidth(contRef)

  const headerItems = [
    <HeaderItem text="일" />,
    <HeaderItem text="월" />,
    <HeaderItem text="화" />,
    <HeaderItem text="수" />,
    <HeaderItem text="목" />,
    <HeaderItem text="금" />,
    <HeaderItem text="토" />
  ];


  return (
    <div ref={ contRef }>
      <div>{ props.year }년</div>
      <div>{ props.month }</div>
      <div>
        <WeekLine list={ headerItems } />
        <WeekLine
          borderTop="1px solid rgb(206,206,206)"
          list={ [<Day />,<Day />,<Day />,<Day />,<Day />,<Day />,<Day />] }
        />
        <WeekLine
          borderTop="1px solid rgb(206,206,206)"
          list={ [<Day />,<Day />,<Day />,<Day />,<Day />,<Day />,<Day />] }
        />
      </div>
    </div>
  )
}

Calendar.defaultProps = {
  year: '2022',
  month: '7',
  startDay: 1,
  endDay: 31,
  startDatWeek: 'fri'
}

export default Calendar

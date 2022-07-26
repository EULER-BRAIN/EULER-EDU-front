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
    background: `rgba(120,120,120,${ isHover && props.day ? 0.1 : 0 })`,
    cursor: props.day ? 'pointer' : 'auto',
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
      <div style={ styleDay }>{ props.day ? props.day : '' }</div>
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
    <HeaderItem key={ 0 } text="일" />,
    <HeaderItem key={ 1 } text="월" />,
    <HeaderItem key={ 2 } text="화" />,
    <HeaderItem key={ 3 } text="수" />,
    <HeaderItem key={ 4 } text="목" />,
    <HeaderItem key={ 5 } text="금" />,
    <HeaderItem key={ 6 } text="토" />
  ];

  const weekDayList = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  let dayQueueTop = props.startDay;
  const weekList = [];
  while (dayQueueTop < props.endDay) {
    const list = weekDayList.map((week, index) => {
      if ((dayQueueTop === props.startDay && weekDayList[index] !== props.startDayWeek)
        || dayQueueTop > props.endDay) {
        return (
          <Day key={ week } />
        );
      }
      const day = dayQueueTop;
      dayQueueTop += 1;
      return (
        <Day
          key={ week }
          day={ day }
        />
      );
    });
    weekList.push(list);
  }

  const styleYear = {
    fontSize: '13px',
    color: 'rgb(90,90,90)'
  }
  const styleMonth = {
    fontSize: '20px',
    color: 'rgb(30,30,30)'
  }
  const styleMonthSt = {
    paddingLeft: '2px',
    fontsize: '13px',
    color: 'rgb(90,90,90)'
  }

  return (
    <div
      style={{ position: 'relative' }}
      ref={ contRef }
    > 
      <div>
        <div style={ styleYear } className="">{ props.year }년</div>
        <div>
          <span style={ styleMonth } className="FBold">{ props.month }</span>
          <span style={ styleMonthSt }>월</span>
        </div>
      </div>
      <div style={{ height: '10px' }} />
      <div>
        <WeekLine list={ headerItems } />
        { weekList.map((list, index) => (
          <WeekLine
            key={ index }
            borderTop="1px solid rgb(206,206,206)"
            list={ list }
          />
        )) }
      </div>
    </div>
  )
}

Calendar.defaultProps = {
  year: '2022',
  month: '6',
  startDay: 1,
  endDay: 30,
  startDayWeek: 'wed'
}

export default Calendar

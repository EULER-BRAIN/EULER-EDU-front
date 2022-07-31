import { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import Link from '@components/Layout/Link'
import { date2Str2 } from '@tools/trans'

import { MdSchedule } from 'react-icons/md';

const NoticeItem = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    height: '30px',
    position: 'relative',
    overflow: 'hidden',
    borderBottom: '1px solid rgb(206, 206, 206)',
    background: `rgba(120,120,120,${ isHover ? 0.1 : 0 })`,
    config: { duration: 100 }
  })
  const styleTitle = {
    position: 'absolute',
    top: '0px',
    left: '10px',
    right: '80px',
    height: '30px',
    lineHeight: '30px',
    overflow: 'hidden',
    fontSize: '15px',
  }
  const styleIcon = {
    verticalAlign: 'middle',
    marginTop: '-2px',
    width: '16px',
    height: '16px',
  }
  const styleDate = {
    position: 'absolute',
    top: '0px',
    right: '10px',
    height: '30px',
    lineHeight: '30px',
    color: 'gray',
    fontSize: '12px',
  }

  const body = (
    <animated.div
      style={ style }
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
    >
      <div style={ styleTitle }>
        { props.title }
      </div>
      <div style={ styleDate }>
        <MdSchedule style={ styleIcon } />
        { date2Str2(props.date, props.dateNow) }
      </div>
    </animated.div>
  )

  return props.link ? (
    <a
      href={ props.link }
      target="_blank"
      rel="noreferrer"
    >
      { body }
    </a>
  ) : (
    <Link to={ `/notices/content/${ props.id }` }>
      { body }
    </Link>
  )
}

const NoticeTable = (props) => {
  return (
    <div>
      {
        props.notices.map((item, index) => (
          <NoticeItem
            key={ index }
            id={ item._id }
            title={ item.title }
            link={ item.link }
            date={ item.modifyDate }
            dateNow={ props.dateNow }
          />
        ))
      }
    </div>
  )
}

export default NoticeTable;

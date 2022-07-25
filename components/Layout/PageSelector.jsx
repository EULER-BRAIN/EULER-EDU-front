import { useState } from "react";
import { useSpring, animated } from "react-spring";
import Link from '@components/Layout/Link';

const Btn = (props) => {
  const [isHover, setHover] = useState(false);
  const styleBtn = useSpring({
    border: '1px solid rgb(206,206,206)',
    borderRadius: '3px',
    height: '30px',
    lineHeight: '30px',
    paddingLeft: '9px',
    paddingRight: '9px',
    fontSize: '13px',
    background: `rgba(200,200,200,${ isHover ? 0.2 : 0 })`,
    config: { duration: 100 }
  });

  return (
    <Link to={ props.to }>
      <animated.div
        onMouseEnter={ () => setHover(true) }
        onMouseLeave={ () => setHover(false) }
        style={ styleBtn }
        className="ND"
      >
        { props.children }
      </animated.div>
    </Link>
  )
}

const PageSelector = (props) => {
  const page = parseInt(props.page);
  const maxPage = parseInt(props.maxPage);
  if (!maxPage) return null;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'right',
      flexWrap: 'wrap',
      gap: '10px'
    }}>
      {
        page > 1 ? (
          <Btn to={ props.makeLinkTo(page - 1) }>
            &lt; 이전 페이지
          </Btn>
        ) : null
      }
      <div style={{
        height: '30px',
        lineHeight: '30px',
        fontSize: '15px',
      }}>
        { page } / { maxPage }
      </div>
      {
        page < maxPage ? (
          <Btn to={ props.makeLinkTo(page + 1) }>
            다음 페이지 &gt;
          </Btn>
        ) : null
      }
    </div>
  )
}

export default PageSelector

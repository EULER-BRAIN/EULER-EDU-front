import { useSpring, animated } from 'react-spring';
import { BiLoaderAlt } from 'react-icons/bi'

const Loading = (props) => {
  const style = useSpring({
    loop: true,
    config: { duration: 2000 },
    from: { 
      width: props.size,
      height: props.size,
      transform: 'rotate(0deg)'
    },
    to: {
      width: props.size,
      height: props.size,
      transform: 'rotate(${ 360 }deg)'
  }
  });
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <animated.div style={ style }>
        <BiLoaderAlt style={{
          width: '100%',
          height: '100%',
          fill: props.color
        }} />
      </animated.div>
    </div>
  )
}
Loading.defaultProps = {
  size: '28px',
  color: 'gray'
}

const LoadingDiv = (props) => {
  const styleText = {
    paddingTop: '7px',
    fontSize: '13px',
    textAlign: 'center'
  }
  return (
    <div>
      <Loading />
      <div
        style={ styleText }
        className="FLight"
      >
        { props.children }
      </div>
    </div>
  )
}
LoadingDiv.defaultProps = {
  children: '페이지 불러오는 중'
}

export { Loading, LoadingDiv }
export default LoadingDiv

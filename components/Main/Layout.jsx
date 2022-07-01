import useBodyWidth from '@components/Layout/useBodyWidth'
import Link from '@components/Layout/Link'

const Title = (props) => {
  const style = {
    fontFamily: 'NanumBarunGothicBold',
    fontSize: '21px',
    lineHeight: '25px'
  }

  return (
    <>
      { props.paddingTop || props.padding ? (
          <div style={{ height: '15px' }} />
        ) : null
      }
      <div style={ style }>
        { props.children }
      </div>
      { props.paddingBottom || props.padding ? (
          <div style={{ height: '15px' }} />
        ) : null
      }
    </>
  )
}

const BtnMore = (props) => {
  const style = {
    position: 'absolute',
    top: '15px', right: '0px',
    color: 'rgb(100,100,100)',
    fontSize: '14px',
    lineHeight: '25px'
  }
  return props.href ? (
    <a
      href={ props.href }
      target="_blank" rel="noreferrer"
    >
      <div style={ style } className="FExtraLight">바로가기</div>
    </a>
  ) : (
    <Link to={ props.link }>
      <div style={ style } className="FExtraLight">바로가기</div>
    </Link>
  )
}

const HorizontalScroll = (props) => {
  const fullWidth = useBodyWidth();
  const bodyWidth = props.itemWidth * props.itemList.length
    + props.gap * Math.max(props.itemList.length - 1, 0);
  const leftWidth = (fullWidth >= 910 ? (fullWidth - 884) / 2 : 13);
  const rightWidth = 13;
  
  if (props.itemList.length == 0) return null;
  return (
    <div style={{
      width: '100%',
      height: `${ props.height }px`,
      overflowX: 'auto',
      overflowY: 'hidden',
      position: 'relative'
    }} className="NSB">
      <div style = {{
          width: `${ bodyWidth + leftWidth + rightWidth }px`,
          height: `${ props.height }px`,
          position: 'relative'
      }}>
        <div style={{
          width: `${ bodyWidth }px`,
          height: `${ props.height }px`,
          position: 'absolute',
          top: '0px', left: `${ leftWidth }px`
        }}>
          { props.itemList.map((item, index) => {
            return (
              <div style={{
                position: 'absolute',
                top: '0px',
                left: `${ index * (props.itemWidth + props.gap) }px`,
                width: `${ props.width }px`,
                height: `${ props.height }px`,
              }} key={ index }>
                { item }
              </div>
            )  
          }) }
        </div>
      </div>
    </div>
  )
}

const SandwichLine = () => {
  return (
    <div
      style={{
        paddingTop: '25px',
        borderBottom: '1px solid rgb(206,206,206)'
      }}
    />
  )
}

export default { Title, BtnMore, HorizontalScroll, SandwichLine }

import useBodyWidth from '@components/Layout/useBodyWidth'

const Title = (props) => {
  const style = {
    fontFamily: 'NanumBarunGothicBold',
    fontSize: '21px'
  }

  return (
    <div style={ style }>
      { props.children }
    </div>
  )
}

const HorizontalScroll = (props) => {
  const fullWidth = useBodyWidth();
  const bodyWidth = props.itemWidth * props.itemList.length
    + props.gap * Math.max(props.itemList.length - 1, 0);
  const leftWidth = (fullWidth >= 910 ? (fullWidth - 884) / 2 : 13);
  
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
          width: `${ bodyWidth + leftWidth }px`,
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

export default { Title, HorizontalScroll }

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

export { Title, Content, BtmEmpty }

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

export default { Title }

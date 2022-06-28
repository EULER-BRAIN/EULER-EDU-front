import HeaderEmpty from "@components/Header/HeaderEmpty"

const Gallery = () => {
  const styleBottom = {
    position: 'absolute',
    bottom: '0px', left: '0px',
    width: '100%',
    height: '100px',
    borderTop: '1px solid rgb(206,206,206)',
    background: 'white'
  }
  return (
    <div style={{
      position: 'fixed',
      width: '100%', height: '100%',
      background: '#f3f3f3',
      overflow: 'hiddne'
    }}>
      <HeaderEmpty />
      <div style={ styleBottom }>
        123
      </div>
    </div>
  )
}

export default Gallery

import AwesomeSlider from 'react-awesome-slider';
import HeaderEmpty from "@components/Header/HeaderEmpty"

import 'react-awesome-slider/dist/styles.css';

const Award = () => {
  const style = {
    position: 'absolute',
    top: '0px', left: '0px',
    width: '100%', height: '100%',
    background: '#f3f3f3'
  }
  const styleBody = {
    width: '100%',
    height: 'calc(100% - 100px)',
    position: 'relative'
  }
  const styleBottom = {
    position: 'absolute',
    bottom: '0px', left: '0px',
    width: '100%',
    height: '100px',
    borderTop: '1px solid rgb(206,206,206)',
    background: 'white',
    overflow: 'hidden'
  }
  const styleContent = {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '10px'
  }
  return (
    <div style={ style }>
      <div style={ styleBody }>
        image
      </div>
      <div style={ styleBottom }>
        <div style={ styleContent }>
          Bottom - Content
        </div>
      </div>
    </div>
  )
}
const Gallery = () => {
  return (
    <div style={{
      position: 'fixed',
      width: '100%', height: '100%',
      background: '#f3f3f3',
      overflow: 'hiddne'
    }}>
      <HeaderEmpty />
      <div style={{
        position: 'absolute',
        top: '50px', bottom: '0px',
        left: '0px', right: '0px',
      }}>
        <AwesomeSlider
          fillParent={ true }
          infinite={ false }
        >
          <div><Award /></div>
          <div><Award /></div>
          <div><Award /></div>
        </AwesomeSlider>
      </div>
    </div>
  )
}

export default Gallery

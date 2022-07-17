import { useRef } from 'react'
import Image from 'next/image'
import AwesomeSlider from 'react-awesome-slider';
import HeaderEmpty from "@components/Header/HeaderEmpty"
import getS3ImgUrl from '@tools/getS3ImgUrl'

import 'react-awesome-slider/dist/styles.css';
import useCompWidth from '@components/Layout/useCompWidth';
import useCompHeight from '@components/Layout/useCompHeight';

const AutoAdjustAward = (props) => {
  const contRef = useRef();
  const contWidth = useCompWidth(contRef);
  const contHeight = useCompHeight(contRef);
  const size = Math.min(contWidth, contHeight);

  const style = {
    width: '100%', height: '100%',
    position: 'relative'
  }
  const styleBox = {
    position: 'absolute',
    top: `${ (contHeight - size) / 2 }px`,
    left: `${ (contWidth - size) / 2 }px`,
    width: `${ size }px`,
    height: `${ size }px`
  }
  
  return (
    <div
      style={ style }
      ref={ contRef }
    >
      <div style={ styleBox }>
        { props.children }
      </div>
    </div>
  )
}

const Award = (props) => {
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
        <AutoAdjustAward>
          <Image
            src={ getS3ImgUrl(`awards/${ props.id }.png`) }
            alt={ `awards/${ props.id }` }
            layout="fill"
          />
        </AutoAdjustAward>
        { props.id }
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
          <div><Award id="test01" /></div>
          <div><Award id="test02" /></div>
          <div><Award id="test03" /></div>
        </AwesomeSlider>
      </div>
    </div>
  )
}

export default Gallery

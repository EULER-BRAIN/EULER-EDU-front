import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import AwesomeSlider from 'react-awesome-slider';
import HeaderEmpty from "@components/Header/HeaderEmpty"
import getS3ImgUrl from '@tools/getS3ImgUrl'
import useCompWidth from '@components/Layout/useCompWidth';
import useCompHeight from '@components/Layout/useCompHeight';
import axiosEDU from '@tools/axiosEDU';

import 'react-awesome-slider/dist/styles.css';

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
  
  if (!props.id) return null;
  return (
    <div
      style={ style }
      ref={ contRef }
    >
      <div style={ styleBox }>
        <Image
          src={ getS3ImgUrl(`awards/${ props.id }.png`) }
          alt={ `awards/${ props.id }` }
          layout="fill"
        />
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
        <AutoAdjustAward
          id={ props.id }
        />
      </div>
      <div style={ styleBottom }>
        <div style={ styleContent }>
          <div
            style={{
              fontSize: '15px'
            }}
            className="FRegular"
          >
            { props.name ? props.name : '' }
          </div>
          <div
            style={{
              paddingTop: '6px',
              fontSize: '13px',
              color: 'rgb(100,100,100)'
            }}
          >
            { props.content ? props.content : '' }
          </div>
        </div>
      </div>
    </div>
  )
}

const Gallery = ({ id }) => {
  const [awards, setAwards] = useState({});
  useEffect(() => {
    if (awards) setAwards(undefined);
  }, [id])
  useEffect(() => {
    if (!awards && id) {
      axiosEDU.get(`/main/award/content/${ id }`).then(({ data }) => {
        if (data.award) {
          setAwards({
            prev: data.awardPrev,
            current: data.award,
            next: data.awardNext,
          })
        }
        else {
          // FIXME
        }
      })
    }
  }, [awards])

  const router = useRouter();
  const onTransitionEnd = (x) => {
    if (awards?.prev && x.currentIndex == 0 && awards?.prev?._id) {
      router.push(`/awards/gallery/${ awards?.prev?._id }`);
    }
    if (awards?.prev && x.currentIndex == 2 && awards?.next?._id) {
      router.push(`/awards/gallery/${ awards?.next?._id }`);
    }
    if (!awards?.prev && x.currentIndex == 1 && awards?.next?._id) {
      router.push(`/awards/gallery/${ awards?.next?._id }`);
    }
  }

  let body = (
    <Award
      id={ id }
    />
  );  
  if (awards?.current) {
    const sliderList = [];
    if (awards?.prev) {
      sliderList.push((
        <Award
          id={ awards?.prev?._id }
          name={ awards?.prev?.name }
          content={ awards?.prev?.content }
        />
      ))
    }
    sliderList.push((
      <Award
        id={ awards?.current?._id }
        name={ awards?.current?.name }
        content={ awards?.current?.content }
      />
    ))
    if (awards?.next) {
      sliderList.push((
        <Award
          id={ awards?.next?._id }
          name={ awards?.next?.name }
          content={ awards?.next?.content }
        />
      ))
    }
    body = (
      <AwesomeSlider
        selected={ awards?.prev ? 1 : 0 }
        fillParent={ true }
        infinite={ false }
        bullets={ false }
        onTransitionEnd={ onTransitionEnd }
      >
        {
          sliderList.map((item, index) => (
            <div key={ index }>
              { item }
            </div>
          ))
        }
      </AwesomeSlider>
    )
  }

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
        { body }
      </div>
    </div>
  )
}

export default Gallery

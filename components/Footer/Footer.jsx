import { useRef } from "react"
import Image from "next/image";
import useCompWidth from "@components/Layout/useCompWidth";
import RLayout from "@components/Layout/RLayout"
import FooterEmpty from "./FooterEmpty"

import svgLogo from '@public/eulerLogo/logo.gray.svg'
import imgBook from './logo/logo_book.png';
import imgInsta from './logo/logo_instagram.png';
import imgBand from './logo/logo_band.png';
import imgBlog from './logo/logo_blog.png';
import { AiFillFacebook, AiFillYoutube } from 'react-icons/ai';

const AcSite = (props) => {
  const style = {
    position: 'relative',
    width: '30px', height: '30px',
    background: 'rgb(200,200,200)',
    borderRadius: '7px',
    overflow: 'hidden'
  }

  return (
    <a
      href={ props.href }
      target="_blank"
      rel="noreferrer"
    >
      <div
        style={ style }
        className="ND"
      >
        { props.children }
      </div>
    </a>
  )
}
const Lay1 = () => {
  const contRef = useRef();
  const contWidth = useCompWidth(contRef);

  const styleLogo = {
    position: 'absolute',
    top: '5px', left: '0px',
    width: '20px', height: '20px'
  }
  const styleCR = {
    paddingLeft: '22px',
    paddingTop: '7px',
    fontSize: '13px',
    lineHeight: '16px',
    color: 'rgb(120,120,120)'
  }

  const layLeft = (
    <div style={{
      display: 'flex',
      gap: '6px'
    }}>
      <AcSite href="https://smartstore.naver.com/eulerbooks">
        <div style={{
          width: '100%', height: '100%',
          background: 'rgb(2,199,60)'
        }}>
          <div style={{
            position: 'absolute',
            top: '2px', left: '2px',
            width: '26px', height: '26px'
          }}>
            <Image
              src={ imgBook }
              width={ 26 }
              height={ 26 }
            />
          </div>
        </div>
      </AcSite>
      <AcSite href="https://www.youtube.com/channel/UCQQJLCWcgAvrWRdZaxLUXJQ">
        <div style={{
          width: '100%', height: '100%',
          background: 'rgb(211,39,45)'
        }}>
          <AiFillYoutube
            style={{
              position: 'absolute',
              top: '15%', left: '15%',
              width: '70%', height: '70%',
              fill: 'white'
            }}
          />
        </div>
      </AcSite>
      <AcSite href="https://www.instagram.com/euler_lab/">
        <Image
          src={ imgInsta }
          width={ 30 }
          height={ 30 }
        />
      </AcSite>
      <AcSite href="https://www.facebook.com/euleredu">
        <div style={{
          width: '100%', height: '100%',
          background: 'white'
        }}>
          <AiFillFacebook
            style={{
              position: 'absolute',
              top: '-15%', left: '-15%',
              width: '130%', height: '130%',
              fill: 'rgb(12,76,162)'
            }}
          />
        </div>
      </AcSite>
      <AcSite href="https://band.us/@euler">
        <Image
          src={ imgBand }
          width={ 30 }
          height={ 30 }
        />
      </AcSite>
      <AcSite href="https://blog.naver.com/euleredu">
        <div style={{
          width: '100%', height: '100%',
          background: 'rgb(2,192,57)'
        }}>
          <div style={{
            position: 'absolute',
            top: '2px', left: '2px',
            width: '26px', height: '26px'
          }}>
            <Image
              src={ imgBlog }
              width={ 26 }
              height={ 26 }
            />
          </div>
        </div>
      </AcSite>
    </div>
  )

  const layRight = (
    <div style={{
      position: 'relative'
    }}>
      <div style={ styleLogo }>
        <Image
          src={ svgLogo }
          layout="fill"
        />
      </div>
      <div style={ styleCR }>
        Copyright ⓒ 2022 EULER. All right reserved.
      </div>
    </div>
  )

  return (
    <div ref={ contRef }>
      {
        contWidth > 600 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            { layLeft }
            { layRight }
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            { layLeft }
            <div style={{ height: '20px', width: '100%' }} />
            { layRight }
          </div>
        )
      }
    </div>
  )
  
}

const Footer = (props) => {
  const style = {
    marginTop: '30px',
    borderTop: '1px solid rgb(206, 206, 206)',
  }

  return (
    <>
      { props.padding ? <FooterEmpty /> : null }
      <div style={ style }>
        <div style={{ height: '40px' }} />
        <RLayout>
          <Lay1 />
        </RLayout>
        <div style={{ height: '50px' }} />
      </div>
    </>
  )
}

export default Footer

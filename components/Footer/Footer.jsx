import { useRef } from "react"
import Image from "next/image";
import useCompWidth from "@components/Layout/useCompWidth";
import RLayout from "@components/Layout/RLayout"
import FooterEmpty from "./FooterEmpty"

import svgLogo from '@public/eulerLogo/logo.gray.svg'

const AcSite = (props) => {
  const style = {
    width: '30px', height: '30px',
    background: 'rgb(200,200,200)',
    borderRadius: '7px',
    overflow: 'hidden'
  }

  return (
    <div style={ style }>
    </div>
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
      <AcSite />
      <AcSite />
      <AcSite />
      <AcSite />
      <AcSite />
      <AcSite />
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

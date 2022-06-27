import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import Navigation from './Navigation/Navigation';

import svgLogo from "@public/eulerLogo/logo.svg";

const Header = () => {
  const [isNaviPopup, setNaviPopup] = useState(false);

  const style = {
    position: 'fixed',
    top: '0px', left: '0px',
    width: '100%', height: '50px',
    background: 'rgb(255,255,255)',
    overflow: 'hidden',
    zIndex: 100
  }
  const styleLogo = {
    position: 'absolute',
    top: '0px', left: '10px',
    height: '30px'
  }
  const styleNavi = {
    position: 'absolute',
    top: '0px', right: '0px'
  }

  return (
    <>
      <div style={ style }>
        <div style={ styleLogo }>
          <Link href="/">
            <a>
              <Image
                src={ svgLogo } alt="EULER EDU"
                quality={ 100 }
                width={ 30 } height={ 30 }
              />
            </a>
          </Link>
        </div>
        <div
          style={ styleNavi }
          onClick={ () => setNaviPopup(true) }
        >navi</div>
      </div>
      <Navigation
        popup={ isNaviPopup }
        onClose={ () => setNaviPopup(false) }
      />
    </>
  )
}

export default Header

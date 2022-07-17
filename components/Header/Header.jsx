import { useState } from 'react';
import Image from 'next/image';
import Link from '@components/Layout/Link';
import Navigation from './Navigation/Navigation';

import svgLogo from "@public/eulerLogo/logo.svg";
import IconMenu from '@material-ui/icons/Menu';

const Header = () => {
  const [isNaviPopup, setNaviPopup] = useState(false);

  const style = {
    position: 'fixed',
    top: '0px', left: '0px',
    width: '100%', height: '50px',
    background: 'rgb(255,255,255)',
    overflow: 'hidden',
    borderBottom: '1px solid rgb(206, 206, 206)',
    zIndex: 100
  }
  const styleLogo = {
    position: 'absolute',
    top: '10px', left: '10px',
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
          <Link to="/">
            <Image
              src={ svgLogo } alt="EULER EDU"
              quality={ 100 }
              width={ 30 } height={ 30 }
            />
          </Link>
        </div>
        <div
          style={ styleNavi }
          onClick={ () => setNaviPopup(true) }
        >
          <IconMenu variant="contained" color="black" />
        </div>
      </div>
      <Navigation
        popup={ isNaviPopup }
        onClose={ () => setNaviPopup(false) }
      />
    </>
  )
}

export default Header

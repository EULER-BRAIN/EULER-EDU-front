import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image';
import Link from '@components/Layout/Link';
import Navigation from './Navigation/Navigation';
import axiosEDU from '@tools/axiosEDU';

import svgLogo from "@public/eulerLogo/logo.svg";
import { MdMenu } from 'react-icons/md';

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
    top: '12px', right: '12px',
    width: '26px', height: '26px'
  }
  const styleNaviIcon = {
    width: '100%', height: '100%',
    fill: 'rgb(70,70,70)'
  }

  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({});
  useEffect(() => {
    axiosEDU.get('/login/getInfo').then(({ data }) => {
      setLoginInfo({
        isStudent: data.isStudent,
        isTeacher: data.isTeacher,
        isLogined: data.isLogined,
        name: data.name
      })
    })
  }, [router.pathname])

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
          className="BTNC"
        >
          <MdMenu style={ styleNaviIcon } />
        </div>
      </div>
      <Navigation
        loginInfo={ loginInfo }
        popup={ isNaviPopup }
        onClose={ () => setNaviPopup(false) }
      />
    </>
  )
}

export default Header

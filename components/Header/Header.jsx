import Image from 'next/image'

import svgLogo from "@public/eulerLogo/logo.svg";

const Header = () => {
  const style = {
    position: 'fixed',
    top: '0px', left: '0px',
    width: '100%', height: '50px',
    background: 'rgb(255,255,255)',
    overflow: 'hidden'
  }
  const styleLogo = {
    position: 'absolute',
    top: '0px', left: '10px',
    height: '30px'
  }

  return (
    <div style={ style }>
      <div style={ styleLogo }>
        <Image
          src={ svgLogo } alt="EULER EDU"
          quality={ 100 }
          width={ 30 } height={ 30 }
        />
      </div>
    </div>
  )
}

export default Header

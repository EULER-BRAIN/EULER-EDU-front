import getS3ImgUrl from '@tools/getS3ImgUrl'
import Image from 'next/image'

const PosterMainItem = (props) => {
  const style = {
    width: '200px',
    height: '280px',
    overflow: 'hidden',
    border: '1px solid rgb(206, 206, 206)',
    borderRadius: '10px'
  }
  const styleImgCont = {
    position: 'relative',
    width: '200px',
    height: '200px',
    background: 'rgb(200,200,200)'
  }
  const styleTitle = {
    paddingLeft: '10px', paddingRight: '10px',
    paddingTop: '10px'
  }
  const styleContent = {
    paddingLeft: '10px', paddingRight: '10px',
    paddingTop: '5px',
    fontSize: '14px',
    color: 'rgb(100,100,100)'
  }
  return (
    <a
      href={ props.link }
      target="_blank"
      rel="noreferrer"
    >
      <div
        style={ style }
      >
        <div style={ styleImgCont }>
          <Image
            src={ getS3ImgUrl(`posters/${ props.id }`) }
            width={ 200 }
            height={ 200 }
            alt={ `posters/${ props.id }` }
          />
        </div>
        <div
          style={ styleTitle }
        >
          { props.title }
        </div>
        <div style={ styleContent }>
          { props.content }
        </div>
      </div>
    </a>
  )
}

export default PosterMainItem;

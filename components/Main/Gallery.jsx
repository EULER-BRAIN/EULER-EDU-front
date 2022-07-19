import useBodyWidth from "@components/Layout/useBodyWidth"

const Gallery = () => {
  const width = useBodyWidth();
  
  const style = {
    height: '100px',
    background: 'rgb(200,200,200)'
  }
  return (
    <div style={ style }>
      Gallery
    </div>
  )
}

export default Gallery

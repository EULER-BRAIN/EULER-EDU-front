import RLayout from "@components/Layout/RLayout"
import FooterEmpty from "./FooterEmpty"

const Footer = (props) => {
  const style = {
    marginTop: '30px',
    borderTop: '1px solid rgb(206, 206, 206)',
  }

  return (
    <>
      { props.padding ? <FooterEmpty /> : null }
      <div style={ style }>
        <div style={{ height: '20px' }} />
        <RLayout>
          Footer<br />
          Footer 아이콘 이미지 주세요!
        </RLayout>
        <div style={{ height: '20px' }} />
      </div>
    </>
  )
}

export default Footer

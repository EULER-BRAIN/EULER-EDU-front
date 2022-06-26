import RLayout from "@components/Layout/RLayout"

const Footer = () => {
  const style = {
    marginTop: '30px',
    borderTop: '1px solid rgb(206, 206, 206)',
  }

  return (
    <div style={ style }>
      <div style={{ height: '20px' }} />
      <RLayout>
        Footer
      </RLayout>
      <div style={{ height: '20px' }} />
    </div>
  )
}

export default Footer

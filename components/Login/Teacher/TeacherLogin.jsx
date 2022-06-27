import HeaderEmpty from '@components/Header/HeaderEmpty'
import Footer from '@components/Footer/Footer'

const TeacherLogin = () => {
  const styleEuler = {
    textAlign: 'center',
    color: '#c2151c',
    fontSize: '26px'
  }
  const styleTitle = {
    textAlign: 'center',
    color: 'rgb(60,60,60)',
    fontSize: '20px'
  }
  return (
    <div>
      <HeaderEmpty />
      <div style={{
        marginLeft: '20px',
        marginRight: '20px'
      }}>
        <div style={{
          maxWidth: '280px',
          margin: 'auto'
        }}>
          <div style={{ height: '40px' }}/>
          <div style={ styleEuler } className="FBold">EULER</div>
          <div style={ styleTitle } className="FBold">선생님 로그인</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TeacherLogin

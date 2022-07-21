import { Title, Content, BtmEmpty, TopFlexBtn } from "../../../ParentSystem/Layout/LSet"
import { LoadingDiv } from "@components/Layout/Loading"
import Link from "@components/Layout/Link";

const TeacherTop = (props) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'right',
      paddingBottom: '10px',
      borderBottom: '1px solid rgb(206,206,206)',
    }}>
      <Link to="/management/campus/teacher/add">
        <TopFlexBtn>선생님 추가</TopFlexBtn>
      </Link>
    </div>
  )
}
const TeacherTableItem = (props) => {
  const style = {
    borderBottom: '1px solid rgb(206,206,206)',
    padding: '10px',
  }
  return (
    <div style={ style }>
      <div>
        김명식 선생님
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'right',
      }}>
        <Link to="/management/campus/teacher/add">
          <TopFlexBtn>수정</TopFlexBtn>
        </Link>
      </div>
    </div>
  )
}
const TeacherTable = (props) => {
  return (
    <div>
      <TeacherTableItem />
    </div>
  )
}

const Teacher = () => {
  return (
    <div>
      <Title>선생님 리스트</Title>
      <Content>
        <TeacherTop />
        <TeacherTable />
        <div style={{ height: '20px' }} />
        <LoadingDiv />
      </Content>
    </div>
  )
}

export default Teacher

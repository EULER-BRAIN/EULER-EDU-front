import { useEffect, useState } from "react";
import { Title, Content, TopFlexBtn, TopFlexText, TopFlexTag } from "../../../ParentSystem/Layout/LSet"
import { LoadingDiv } from "@components/Layout/Loading"
import Link from "@components/Layout/Link";
import { useCampusOnManagement } from "@tools/useSystemProp";
import axiosEDU from "@tools/axiosEDU";

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
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        paddingBottom: '10px'
      }}>
        <TopFlexText>{ props.name }</TopFlexText>
        <TopFlexTag
          tagName="아이디"
        >{ props.id }</TopFlexTag>
        <TopFlexTag
          tagName="관리 권한"
        >{ props.level }</TopFlexTag>
        <TopFlexTag
          tagName="소속 캠퍼스"
        >{ props.campus }</TopFlexTag>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'right',
        gap: '5px'
      }}>
        <Link to={ `/management/campus/teacher/info?id=${ props.id }` }>
          <TopFlexBtn>추가 정보</TopFlexBtn>
        </Link>
        <Link to={ `/management/campus/teacher/edit?id=${ props.id }` }>
          <TopFlexBtn>수정</TopFlexBtn>
        </Link>
      </div>
    </div>
  )
}
const TeacherTable = (props) => {
  return (
    <div>
      {
        props.teachers.map((item, index) => (
          <TeacherTableItem
            key={ index }
            oId={ item._id }
            campus={ item.campusName }
            name={ item.name }
            id={ item.id }
            level={ item.level }
          />
        ))
      }
    </div>
  )
}

const Teacher = () => {
  const campus = useCampusOnManagement();
  const [teachers, setTeachers] = useState(null);

  useEffect(() => {
    if (campus) {
      axiosEDU.post('/management/campus/teacher', { campus }).then(({ data }) => {
        if (data.teachers) {
          setTeachers(data.teachers);
        } 
        else {
          // FIXME
        }
      })
    }
  }, [campus]);

  return (
    <div>
      <Title>선생님 리스트</Title>
      <Content>
        {
          Array.isArray(teachers) ? (
            <div>
              <TeacherTop />
              <TeacherTable
                teachers={ teachers }
              />
            </div>
          ) : (
            <div>
              <div style={{ height: '20px' }} />
              <LoadingDiv />
            </div>
          )
        }
      </Content>
    </div>
  )
}

export default Teacher

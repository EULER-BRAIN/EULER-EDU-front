import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router";
import { Title, Content, TopFlexBtn, TopFlexText, TopFlexSaved, TopInput } from "../../../ParentSystem/Layout/LSet"
import { LoadingDiv } from "@components/Layout/Loading"
import { useCampusOnManagement } from "@tools/useSystemProp";
import axiosEDU from "@tools/axiosEDU";
import { level2str } from "@tools/trans";
import regExpTest from "@tools/regExpTest";

const TeacherEditTop = (props) => {
  const router = useRouter();
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'left',
      paddingBottom: '10px',
      borderBottom: '1px solid rgb(206,206,206)',
    }}>
      <TopFlexBtn
        onClick={ () => router.back() }
      >&lt; 뒤로가기</TopFlexBtn>
    </div>
  )
}

const TeacherEdit = (props) => {
  const campus = useCampusOnManagement();
  const [info, setInfo] = useState(null);
  const [inputValue, setInputValue] = useState({});

  useEffect(() => {
    if (campus) {
      axiosEDU.post('/management/campus/teacher/info', {
        id: props.id,
        campus: campus
      }).then(({ data }) => {
        if (data.teacher) {
          setInfo(data.teacher);
          setInputValue(data.teacher);
        } 
        else {
          // FIXME
        }
      });
    }
  }, [props.id, campus]);

  const styleLayD = {
    borderBottom: '1px solid rgb(206,206,206)',
    padding: '10px',
  }
  const styleLayDTop = {
    paddingBottom: '5px',
    display: 'flex',
    gap: '5px'
  }
  const styleLayDBtm = {
    paddingTop: '5px',
    display: 'flex',
    justifyContent: 'right',
    gap: '5px'
  }

  const onCall = useRef();
  const onClickName = () => {
    const name = inputValue.name;
    if (!regExpTest.name(name)) {
      alert('성함이 "^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9-_ ]{2,15}$"을 만족해야 합니다')
      return;
    }
    if (!onCall.current) {
      axiosEDU.post('/management/campus/teacher/edit/name', {
        id: props.id,
        campus: campus,
        name: name
      }).then(({ data }) => {
        if (data.teacher) {
          setInfo(data.teacher);
        } else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }

  return (
    <div>
      <Title>선생님 수정</Title>
      <Content>
        {
          info ? (
            <div>
              <TeacherEditTop />
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>성함</TopFlexText>
                  <TopFlexSaved token={ info.name === inputValue.name } />
                </div>
                <TopInput
                  value={ inputValue.name }
                  onChange={ (x) => {
                    if (RegExp("^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9-_ ]{0,15}$").test(x)) {
                      setInputValue({
                        ...inputValue,
                        name: x
                      })
                    }
                  } }
                />
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ onClickName }
                  >성함 수정</TopFlexBtn>
                </div>
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>아이디</TopFlexText>
                </div>
                <TopInput
                  value={ info.id }
                />
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>비밀번호</TopFlexText>
                </div>
                <TopInput
                  value={ info.password }
                />
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ () => {} }
                  >랜덤 비밀번호</TopFlexBtn>
                  <TopFlexBtn
                    onClick={ () => {} }
                  >비밀번호 수정</TopFlexBtn>
                </div>
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>관리 권한</TopFlexText>
                  <TopFlexSaved token={ info.level === inputValue.level } />
                </div>
                <TopInput
                  value={ level2str(info.level) }
                />
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ () => {} }
                  >캠퍼스 운영자 권한 부여</TopFlexBtn>
                  <TopFlexBtn
                    onClick={ () => {} }
                  >선생님 권한 부여</TopFlexBtn>
                </div>
              </div>
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

export default TeacherEdit

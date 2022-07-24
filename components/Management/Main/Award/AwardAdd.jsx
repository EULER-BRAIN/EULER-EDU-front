import { useState, useRef } from "react"
import { useRouter } from "next/router";
import { Content, Title, TopBackLay, TopFlexBtn, TopFlexSaved, TopFlexText, TopInput } from "@components/ParentSystem/Layout/LSet"
import regExpTest from "@tools/regExpTest";
import axiosEDU from "@tools/axiosEDU";

const AwardAdd = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const styleLayD = {
    borderBottom: '1px solid rgb(206,206,206)',
    padding: '10px',
  }
  const styleLayDTop = {
    paddingBottom: '5px',
    display: 'flex',
    gap: '5px'
  }

  const onCall = useRef(null);
  const router = useRouter();
  const onAdd = () => {
    if (!regExpTest.awardName(name)) {
      return alert('제목은 ' + regExpTest.awardName.toString()+' 을 만족해야 합니다')
    }
    if (!regExpTest.awardContent(content)) {
      return alert('내용은 ' + regExpTest.awardContent.toString()+' 을 만족해야 합니다')
    }
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post("/management/main/award/add",{
        name: name,
        content: content
      }).then(({ data }) => {
        onCall.current = false;
        if (data.award) {
          router.push('/management/main/award');
        }
        else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }

  }

  return (
    <div>
      <Title>어워드 추가</Title>
      <Content>
        <TopBackLay />
        <div style={ styleLayD }>
          <div style={ styleLayDTop }>
            <TopFlexText>제목</TopFlexText>
            <TopFlexSaved token={ regExpTest.awardName(name) } />
          </div>
          <TopInput
            value={ name }
            onChange={ (x) => {
              if (RegExp("^.{0,30}$").test(x)) {
                setName(x)
              }
            } }
          />
        </div>
        <div style={ styleLayD }>
          <div style={ styleLayDTop }>
            <TopFlexText>내용</TopFlexText>
            <TopFlexSaved token={ regExpTest.awardContent(content) } />
          </div>
          <TopInput
            value={ content }
            onChange={ (x) => {
              if (RegExp("^.{0,50}$").test(x)) {
                setContent(x)
              }
            } }
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'right',
          paddingBottom: '10px',
          paddingTop: '10px',
          gap: '10px'
        }}>
          <div style={{
            height: '32px',
            lineHeight: '32px',
            color: 'gray'
          }}>
            어워드는 비공개 상태로 추가됩니다. 수정에서 이를 변경하세요.
          </div>
          <TopFlexBtn
            onClick={ onAdd }
          >
            어워드 추가
          </TopFlexBtn>
        </div>
      </Content>
    </div>
  )
}

export default AwardAdd

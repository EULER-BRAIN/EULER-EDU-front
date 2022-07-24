import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Title, Content, TopInput, TopFlexBtn, TopFlexText, TopFlexSaved } from "@components/ParentSystem/Layout/LSet"
import regExpTest from "@tools/regExpTest";

const Editor = dynamic(
  () => import('../../../Layout/TuiEditor'),
  { ssr: false }
)

const NoticeAddTop = (props) => {
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
const NoticeAdd = (props) => {
  const editorRef = useRef();
  const [title, setTitle] = useState('');

  const styleLayD = {
    borderBottom: '1px solid rgb(206,206,206)',
    padding: '10px',
  }
  const styleLayDTop = {
    paddingBottom: '5px',
    display: 'flex',
    gap: '5px'
  }

  const onAdd = () => {
    if (!regExpTest.noticeTitle(title)) {
      return alert('제목은 "^.{1,40}$"을 만족해야 합니다')
    }
    const content = editorRef.current?.getInstance().getMarkdown();
    if (!content) {
      return alert("내용을 입력하세요")
    }
  }

  return (
    <div>
      <Title>공지 추가</Title>
      <Content>
        <NoticeAddTop />
        <div style={ styleLayD }>
          <div style={ styleLayDTop }>
            <TopFlexText>제목</TopFlexText>
            <TopFlexSaved token={ false } />
          </div>
          <TopInput
            value={ title }
            onChange={ (x) => {
              if (RegExp("^.{1,40}$").test(x)) {
                setTitle(x)
              }
            } }
          />
        </div>
        <div style={ styleLayD }>
          <div style={ styleLayDTop }>
            <TopFlexText>내용</TopFlexText>
          </div>
          <Editor
            editorRef={ editorRef }
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'right',
          paddingBottom: '10px',
          paddingTop: '10px',
        }}>
          <TopFlexBtn
            onClick={ onAdd }
          >
            공지 추가
          </TopFlexBtn>
        </div>
      </Content>
    </div>
  )
}

export default NoticeAdd

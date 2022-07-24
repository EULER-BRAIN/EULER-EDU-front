import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Title, Content, TopInput, TopFlexBtn, TopFlexText, TopFlexSaved, TopBackLay } from "@components/ParentSystem/Layout/LSet"
import regExpTest from "@tools/regExpTest";
import axiosEDU from "@tools/axiosEDU";
import { useCampusOnManagement } from "@tools/useSystemProp";

const Editor = dynamic(
  () => import('../../../Layout/TuiEditor'),
  { ssr: false }
)

const NoticeAdd = (props) => {
  const router = useRouter();
  const campus = useCampusOnManagement();
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

  const onCall = useRef(null);
  const onAdd = () => {
    if (!regExpTest.noticeTitle(title)) {
      return alert('제목은 "^.{1,40}$"을 만족해야 합니다')
    }
    const content = editorRef.current?.getInstance().getMarkdown();
    if (!content) {
      return alert("내용을 입력하세요")
    }
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post("/management/campus/notice/add",{
        campus: campus,
        title: title,
        content: content
      }).then(({ data }) => {
        onCall.current = false;
        if (data.notice) {
          router.push(`/management/campus/notice?campus=${ campus }`);
        }
        else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }

  return (
    <div>
      <Title>공지 추가</Title>
      <Content>
        <TopBackLay />
        <div style={ styleLayD }>
          <div style={ styleLayDTop }>
            <TopFlexText>제목</TopFlexText>
            <TopFlexSaved token={ regExpTest.noticeTitle(title) } />
          </div>
          <TopInput
            value={ title }
            onChange={ (x) => {
              if (RegExp("^.{0,40}$").test(x)) {
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

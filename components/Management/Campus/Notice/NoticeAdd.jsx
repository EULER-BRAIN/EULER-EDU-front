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
  const [link, setLink] = useState("");
  const [type, setType] = useState("content");
  const [isShow, setIsShow] = useState(true);

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

  const onCall = useRef(null);
  const onAdd = () => {
    if (!regExpTest.noticeTitle(title)) {
      return alert('제목은 ' + regExpTest.noticeTitle.toString()+' 을 만족해야 합니다')
    }
    let _content = '';
    let _link = '';
    if (type === 'content') {
      _content = editorRef.current?.getInstance().getMarkdown();
      if (!_content) {
        return alert("내용을 입력하세요")
      }
    }
    else {
      _link = link;
      if (!regExpTest.noticeLink(_link)) {
        return alert("Url을 입력하세요")
      }
    }
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post("/management/campus/notice/add",{
        campus: campus,
        title: title,
        content: _content,
        link: _link,
        isShow: isShow
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
            <TopFlexText>공지 종류</TopFlexText>
          </div>
          <div style={ styleLayDBtm }>
            <TopFlexBtn
              onClick={ () => setType("content") }
            >글 뷰어</TopFlexBtn>
            <TopFlexBtn
              onClick={ () => setType("link") }
            >링크로 이동</TopFlexBtn>
          </div>
        </div>
        {
          type === "content" ? (
            <div style={ styleLayD }>
              <div style={ styleLayDTop }>
                <TopFlexText>내용</TopFlexText>
              </div>
              <Editor
                editorRef={ editorRef }
              />
            </div>
          ) : (
            <div style={ styleLayD }>
              <div style={ styleLayDTop }>
                <TopFlexText>Url</TopFlexText>
                <TopFlexSaved token={ regExpTest.noticeLink(link) } />
              </div>
              <TopInput
                value={ link }
                onChange={ (x) => {
                  if (RegExp("^.{0,100}$").test(x)) {
                    setLink(x)
                  }
                } }
              />
            </div>
          )
        }
        <div style={ styleLayD }>
          <div style={ styleLayDTop }>
            <TopFlexText>공개 여부</TopFlexText>
          </div>
          <TopInput
            value={ isShow ? '공개' : '비공개' }
          />
          <div style={ styleLayDBtm }>
            <TopFlexBtn
              onClick={ () => setIsShow(true) }
            >공개</TopFlexBtn>
            <TopFlexBtn
              onClick={ () => setIsShow(false) }
            >비공개</TopFlexBtn>
          </div>
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

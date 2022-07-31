import { useState, useRef } from "react"
import { useRouter } from "next/router";
import { Content, Title, TopBackLay, TopFlexBtn, TopFlexSaved, TopFlexText, TopInput } from "@components/ParentSystem/Layout/LSet"
import regExpTest from "@tools/regExpTest";
import axiosEDU from "@tools/axiosEDU";
import { useCampusOnManagement } from "@tools/useSystemProp";

const PosterAdd = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');

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
  const campus = useCampusOnManagement();
  const onAdd = () => {
    if (!regExpTest.posterTitle(title)) {
      return alert('제목은 ' + regExpTest.posterTitle.toString()+' 을 만족해야 합니다')
    }
    if (!regExpTest.posterContent(content)) {
      return alert('내용은 ' + regExpTest.posterContent.toString()+' 을 만족해야 합니다')
    }
    if (!regExpTest.posterLink(link)) {
      return alert('Url은 ' + regExpTest.posterLink.toString()+' 을 만족해야 합니다')
    }
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post("/management/campus/poster/add",{
        title: title,
        content: content,
        link: link,
        campus: campus,
      }).then(({ data }) => {
        onCall.current = false;
        if (data.poster) {
          router.push(`/management/campus/poster?campus=${ campus }`);
        }
        else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }

  return (
    <div>
      <Title>포스터 추가</Title>
      <Content>
        <TopBackLay />
        <div style={ styleLayD }>
          <div style={ styleLayDTop }>
            <TopFlexText>제목</TopFlexText>
            <TopFlexSaved token={ regExpTest.posterTitle(title) } />
          </div>
          <TopInput
            value={ title }
            onChange={ (x) => {
              if (RegExp("^.{0,30}$").test(x)) {
                setTitle(x)
              }
            } }
          />
        </div>
        <div style={ styleLayD }>
          <div style={ styleLayDTop }>
            <TopFlexText>내용</TopFlexText>
            <TopFlexSaved token={ regExpTest.posterContent(content) } />
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
        <div style={ styleLayD }>
          <div style={ styleLayDTop }>
            <TopFlexText>Url</TopFlexText>
            <TopFlexSaved token={ regExpTest.posterLink(link) } />
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
            포스터는 비공개 상태로 추가됩니다. 수정에서 이를 변경하세요.
          </div>
          <TopFlexBtn
            onClick={ onAdd }
          >
            포스터 추가
          </TopFlexBtn>
        </div>
      </Content>
    </div>
  )
}

export default PosterAdd;

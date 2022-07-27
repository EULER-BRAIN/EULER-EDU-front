import { useEffect, useState } from "react";
import { Title, Content, TopFlexBtn, TopFlexText, TopFlexTag } from "../../../ParentSystem/Layout/LSet"
import { useCampusOnManagement, usePage } from "@tools/useSystemProp";
import axiosEDU from "@tools/axiosEDU";
import Link from "@components/Layout/Link";
import LoadingDiv from "@components/Layout/Loading";
import PageSelector from "@components/Layout/PageSelector";
import { date2Str } from "@tools/trans";

const NoticeTop = (props) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'right',
      paddingBottom: '10px',
      borderBottom: '1px solid rgb(206,206,206)',
    }}>
      <Link to={ `/management/campus/notice/add?campus=${ props.campus }` }>
        <TopFlexBtn>공지 추가</TopFlexBtn>
      </Link>
    </div>
  )
}

const NoticeTableItem = (props) => {
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
        <TopFlexText>{ props.title }</TopFlexText>
        {
          props.isShow ? null : (
            <TopFlexTag
              tagName="숨김"
              background="rgba(194,21,28,0.5)"
            >공지 비공개</TopFlexTag>
          )
        }
        {
          props.link ? (
            <TopFlexTag
              tagName="종류"
              background="#81c147"
            >링크</TopFlexTag>
          ) : (
            <TopFlexTag
              tagName="종류"
              background="#81c147"
            >글</TopFlexTag>
          )
        }
        <TopFlexTag
          tagName="작성자"
          background="#81c147"
        >{ props.author.name }</TopFlexTag>
        <TopFlexTag
          tagName="등록 날짜"
          background="#81c147"
        >{ date2Str(props.registDate) }</TopFlexTag>
        <TopFlexTag
          tagName="마지막 수정 날짜"
          background="#81c147"
        >{ date2Str(props.modifyDate) }</TopFlexTag>
      </div>
      <div style={{
        paddingTop: '5px',
        display: 'flex',
        justifyContent: 'right',
        gap: '5px'
      }}>
        <Link to={ `/management/campus/notice/edit?campus=${ props.campus }&id=${ props.id }` }>
          <TopFlexBtn>수정</TopFlexBtn>
        </Link>
      </div>
    </div>
  )
}

const NoticeTable = (props) => {
  return (
    <div>
      {
        props.notices.map((item, index) => (
          <NoticeTableItem
            key={ index }
            id={ item._id }
            title={ item.title }
            isShow={ item.isShow }
            link={ item.link }
            author={ item.author }
            registDate={ item.registDate }
            modifyDate={ item.modifyDate }
            campus={ props.campus }
          />
        ))
      }
    </div>
  )
}
const Notice = () => {
  const campus = useCampusOnManagement();
  const page = usePage();
  const [notices, setNotices] = useState(null);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    if (notices) setNotices(null);
  }, [campus, page]);
  useEffect(() => {
    if (!notices) {
      axiosEDU.post("/management/campus/notice", { campus, page }).then(({ data }) => {
        if (data.notices) {
          setNotices(data.notices);
          setPageInfo({
            page: data.page,
            maxPage: data.maxPage
          })
        }
        else {
          // FIXME
        }
      })
    }
  }, [notices])

  return (
    <div>
      <Title>공지 리스트</Title>
      <Content>
        {
          Array.isArray(notices) ? (
            <div>
              <NoticeTop campus={ campus } />
              <NoticeTable
                notices={ notices }
                campus={ campus }
              />
              <div style={{ height: '15px' }} />
              <PageSelector
                page={ pageInfo.page }
                maxPage={ pageInfo.maxPage }
                makeLinkTo={ x => `/management/campus/notice?page=${ x }&campus=${ campus }` }
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

export default Notice

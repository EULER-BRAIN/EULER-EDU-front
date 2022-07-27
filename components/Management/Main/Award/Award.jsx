import { useEffect, useState } from "react";
import { Title, Content, TopFlexText, TopFlexTag, TopFlexBtn } from "../../../ParentSystem/Layout/LSet"
import { LoadingDiv } from "@components/Layout/Loading"
import Link from "@components/Layout/Link";
import axiosEDU from "@tools/axiosEDU";
import { date2Str } from "@tools/trans";
import { usePage } from "@tools/useSystemProp";
import PageSelector from "@components/Layout/PageSelector";

const AwardTop = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'right',
      paddingBottom: '10px',
      borderBottom: '1px solid rgb(206,206,206)',
    }}>
      <Link to="/management/main/award/add">
        <TopFlexBtn>어워드 추가</TopFlexBtn>
      </Link>
    </div>
  )
}

const AwardTableItem = (props) => {
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
        {
          props.isShow ? null : (
            <TopFlexTag
              tagName="숨김"
              background="rgba(194,21,28,0.5)"
            >어워드 비공개</TopFlexTag>
          )
        }
        {
          props.isImg ? null : (
            <TopFlexTag
              tagName="S3"
              background="rgba(194,21,28,0.5)"
            >이미지 없음</TopFlexTag>
          )
        }
        <TopFlexTag
          tagName="등록 날짜"
          background="#81c147"
        >{ date2Str(props.registDate) }</TopFlexTag>
        <TopFlexTag
          tagName="ID"
          background="#81c147"
        >{ props.id }</TopFlexTag>
      </div>
      <div style={{
        fontSize: '13px',
        color: 'gray'
      }}>{ props.content }</div>
      <div style={{
        paddingTop: '5px',
        display: 'flex',
        justifyContent: 'right',
        gap: '5px'
      }}>
        <Link to={ `/management/main/award/edit?id=${ props.id }` }>
          <TopFlexBtn>수정</TopFlexBtn>
        </Link>
      </div>
    </div>
  )
}

const AwardTable = (props) => {
  return (
    <div>
      {
        props.awards.map((item, index) => (
          <AwardTableItem
            key={ index }
            id={ item._id }
            name={ item.name }
            content={ item.content }
            isShow={ item.isShow }
            isImg={ item.isImg }
            registDate={ item.registDate }
          />
        ))
      }
    </div>
  )
}

const Award = () => {
  const page = usePage();
  const [pageInfo, setPageInfo] = useState({});
  const [awards, setAwards] = useState(null);

  useEffect(() => {
    if (awards) setAwards(null);
  }, [page]);
  useEffect(() => {
    if (!awards){
      axiosEDU.post('/management/main/award', { page }).then(({ data }) => {
        if (data.awards) {
          setAwards(data.awards);
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
  }, [awards]);

  return (
    <div>
      <Title>어워드 리스트</Title>
      <Content>
        {
          Array.isArray(awards) ? (
            <div>
              <AwardTop />
              <AwardTable
                awards={ awards }
              />
              <div style={{ height: '15px' }} />
              <PageSelector
                page={ pageInfo.page }
                maxPage={ pageInfo.maxPage }
                makeLinkTo={ x => `/management/main/award?page=${ x }` }
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

export default Award

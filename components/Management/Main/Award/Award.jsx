import { useEffect, useState } from "react";
import { Title, Content, TopFlexText, TopFlexTag, TopFlexBtn } from "../../../ParentSystem/Layout/LSet"
import { LoadingDiv } from "@components/Layout/Loading"
import Link from "@components/Layout/Link";
import axiosEDU from "@tools/axiosEDU";
import { date2Str } from "@tools/trans";

const AwardTop = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'right',
      paddingBottom: '10px',
      borderBottom: '1px solid rgb(206,206,206)',
    }}>
      <Link>
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
            >어워드 비공개</TopFlexTag>
          )
        }
        {
          props.isImg ? null : (
            <TopFlexTag
              tagName="S3"
            >이미지 없음</TopFlexTag>
          )
        }
        <TopFlexTag
          tagName="등록 날짜"
        >{ date2Str(props.registDate) }</TopFlexTag>
        <TopFlexTag
          tagName="ID"
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
        <Link to={ `/management/main/award/img?id=${ props.id }` }>
          <TopFlexBtn>이미지 수정</TopFlexBtn>
        </Link>
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
  const [awards, setAwards] = useState(null);
  useEffect(() => {
    axiosEDU.get('/management/main/award').then(({ data }) => {
      if (data.awards) {
        setAwards(data.awards);
      } 
      else {
        // FIXME
      }
    })
  }, []);

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

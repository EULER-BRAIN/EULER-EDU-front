import { useEffect, useState } from "react";
import { Title, Content, TopFlexBtn, TopFlexText, TopFlexTag } from "../../../ParentSystem/Layout/LSet"
import { useCampusOnManagement, usePage } from "@tools/useSystemProp";
import axiosEDU from "@tools/axiosEDU";
import Link from "@components/Layout/Link";
import LoadingDiv from "@components/Layout/Loading";
import PageSelector from "@components/Layout/PageSelector";
import { date2Str } from "@tools/trans";

const PosterTop = (props) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'right',
      paddingBottom: '10px',
      borderBottom: '1px solid rgb(206,206,206)',
    }}>
      <Link to={ `/management/campus/poster/add?campus=${ props.campus }` }>
        <TopFlexBtn>포스터 추가</TopFlexBtn>
      </Link>
    </div>
  )
}

const PosterTableItem = (props) => {
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
        <TopFlexTag
          tagName="작성자"
          background="#81c147"
        >{ props.author?.name }</TopFlexTag>
        <TopFlexTag
          tagName="등록 날짜"
          background="#81c147"
        >{ date2Str(props.registDate) }</TopFlexTag>
      </div>
      <div style={{
        fontSize: '13px',
        color: 'gray'
      }}>
        { props.content }
      </div>
      <div style={{
        fontSize: '13px',
        color: 'gray'
      }}>
        { props.link }
      </div>
      <div style={{
        paddingTop: '5px',
        display: 'flex',
        justifyContent: 'right',
        gap: '5px'
      }}>
        <a
          href={ props.link }
          target="_blank"
          rel="noreferrer"
        >
          <TopFlexBtn>url 열기</TopFlexBtn>
        </a>
        <Link to={ `/management/campus/poster/edit?campus=${ props.campus }&id=${ props.id }` }>
          <TopFlexBtn>수정</TopFlexBtn>
        </Link>
      </div>
    </div>
  )
}

const PosterTable = (props) => {
  return (
    <div>
      {
        props.posters.map((item, index) => (
          <PosterTableItem
            key={ index }
            id={ item._id }
            title={ item.title }
            content={ item.content }
            link={ item.link }
            author={ item.author }
            registDate={ item.registDate }
            isShow={ item.isShow }
          />
        ))
      }
    </div>
  )
}

const Poster = () => {
  const campus = useCampusOnManagement();
  const page = usePage();
  const [posters, setPosters] = useState(null);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    if (posters) setPosters(null);
  }, [campus, page]);
  useEffect(() => {
    if (!posters) {
      axiosEDU.post("/management/campus/poster", { campus, page }).then(({ data }) => {
        if (data.posters) {
          setPosters(data.posters);
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
  }, [posters])

  return (
    <div>
      <Title>포스터 리스트</Title>
      <Content>
        {
          Array.isArray(posters) ? (
            <div>
              <PosterTop campus={ campus } />
              <PosterTable
                posters={ posters }
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

export default Poster

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Title, Content, TopFlexBtn, TopFlexText, TopFlexTag } from "../../../ParentSystem/Layout/LSet"
import { useCampusOnManagement } from "@tools/useSystemProp";
import axiosEDU from "@tools/axiosEDU";
import Link from "@components/Layout/Link";

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
const Notice = () => {
  const campus = useCampusOnManagement();
  const router = useRouter();
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    const page = router.query.page;

  }, [campus]);

  return (
    <div>
      <Title>공지 리스트</Title>
      <Content>
        <NoticeTop campus={ campus } />
      </Content>
    </div>
  )
}

export default Notice

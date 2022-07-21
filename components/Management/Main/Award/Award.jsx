import { Title, Content, BtmEmpty, TopFlexBtn } from "../../../ParentSystem/Layout/LSet"
import { LoadingDiv } from "@components/Layout/Loading"
import Link from "@components/Layout/Link";

const AwardTop = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'right'
    }}>
      <Link>
        <TopFlexBtn>어워드 추가</TopFlexBtn>
      </Link>
    </div>
  )
}
const Award = () => {
  return (
    <div>
      <Title>어워드 리스트</Title>
      <Content>
        <AwardTop />
        <div style={{ height: '20px' }} />
        <LoadingDiv />
      </Content>
    </div>
  )
}

export default Award

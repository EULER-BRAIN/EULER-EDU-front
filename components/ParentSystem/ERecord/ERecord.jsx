import { Title, Content, BtmEmpty } from "../Layout/LSet"

const Main = () => {
  return (
    <div>
      <Title>입/퇴실 기록</Title>
      <Content>
        달력<br />
        날짜를 선택하면 해당일의 학생 입퇴실 기록을 확인 할 수 있습니다.
      </Content>
      <BtmEmpty />
      <Title>입/퇴실시 자동 메시지</Title>
    </div>
  )
}

export default Main

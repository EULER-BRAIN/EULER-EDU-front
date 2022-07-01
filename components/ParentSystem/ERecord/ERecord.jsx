import { Title, Content, BtmEmpty } from "../Layout/LSet"
import Calendar from "./Calendar"

const Main = () => {
  return (
    <div>
      <Title>입/퇴실 기록</Title>
      <Content>
        <Calendar />
        날짜를 선택하면 해당일의 학생 입퇴실 기록을 확인 할 수 있습니다.
      </Content>
      <BtmEmpty />
      <Title>입/퇴실시 자동 메시지</Title>
      <Content>
        해당 전화번호로 자녀의 입/퇴실시 메시지를 보냅니다.
      </Content>
    </div>
  )
}

export default Main

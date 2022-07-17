import { useSelector } from "react-redux";
import BLayout from "@components/Layout/BLayout";

const Layout = (props) => {
  const state = useSelector((state) => state);
  console.log(state);
  
  const naviList = [
    {
      name: '사이트 회원 관리',
      list: [
        { name: '수업', link: '/parentSystem/lectures' },
        { name: '시험', link: '/parentSystem/tests' },
        { name: '등/하원 기록', link: '/parentSystem/eRecord' },
      ]
    }
  ]

  return (
    <BLayout
      naviName="학부모 시스템"
      naviList={ naviList }
    >
      { props.children }
    </BLayout>
  )
}

export default Layout

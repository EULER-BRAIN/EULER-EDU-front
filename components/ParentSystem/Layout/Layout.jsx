import BLayout from "@components/Layout/BLayout";

const Layout = (props) => {
  const naviList = [
    {
      name: '학생 기록 확인',
      list: [
        { name: '수업', link: '/parentSystem/lectures', id: "lectures" },
        { name: '시험', link: '/parentSystem/tests', id: "tests" },
        { name: '등/하원 기록', link: '/parentSystem/eRecord', id: "eRecord" },
      ]
    }
  ]

  return (
    <BLayout
      naviName="학부모 시스템"
      naviList={ naviList }
      page={ props.page }
    >
      { props.children }
    </BLayout>
  )
}

export default Layout

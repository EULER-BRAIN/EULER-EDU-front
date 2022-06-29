import BLayout from "@components/Layout/BLayout";

const Layout = (props) => {
  const naviList = [
    {
      name: '사이트 회원 관리',
      list: [
        { name: '수업', link: '/' },
        { name: '시험', link: '/' },
        { name: '출석 로그', link: '/' },
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

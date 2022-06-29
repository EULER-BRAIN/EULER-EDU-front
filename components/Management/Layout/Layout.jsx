import BLayout from "@components/Layout/BLayout";

const Layout = (props) => {
  const naviList = [
    {
      name: '사이트 회원 관리',
      list: [
        { name: '월별 접속수', link: '/' },
        { name: '신규회원', link: '/' },
      ]
    },
    {
      name: '사이트 회원 관리',
      list: [
        { name: '월별 접속수', link: '/' },
        { name: '신규회원', link: '/' },
      ]
    }
  ]

  return (
    <BLayout
      naviName="학원 관리"
      naviList={ naviList }
    >
      { props.children }
    </BLayout>
  )
}

export default Layout

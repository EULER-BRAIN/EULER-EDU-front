import { useEffect } from "react"
import { useRouter } from "next/router"
import HeaderEmpty from "@components/Header/HeaderEmpty"
import Footer from "@components/Footer/Footer"
import LoadingDiv from "@components/Layout/Loading"
import axiosEDU from "@tools/axiosEDU"

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    axiosEDU.get('/login/logout').then(({ data }) => {
      if (data.result) {
        // FIXME : replace url
        router.replace('/');
      }
      else {
        // FIXME
      }
    })
  }, [])
  return (
    <div>
      <HeaderEmpty />
      <div style={{ height: '30px' }} />
      <LoadingDiv>로그아웃 중</LoadingDiv>
      <Footer padding />
    </div>
  )
}

export default Logout

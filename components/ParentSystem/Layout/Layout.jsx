import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BLayout from "@components/Layout/BLayout";
import axiosEDU from "@tools/axiosEDU";

const Layout = (props) => {
  const [naviList, setNaviList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axiosEDU.get('/login/getInfo').then(({ data }) => {
      if (!data.isParent) {
        // FIXME
        router.replace('/');
      }
      else {
        setNaviList([
          {
            name: '학생 기록 확인',
            list: [
              { name: '수업', link: '/parentSystem/lectures', id: "lectures" },
              { name: '시험', link: '/parentSystem/tests', id: "tests" },
              { name: '등/하원 기록', link: '/parentSystem/eRecord', id: "eRecord" },
            ]
          }
        ]);
      }
    });
  }, []);

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

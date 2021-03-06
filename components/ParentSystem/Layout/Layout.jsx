import Head from 'next/head'
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
      } else {
        setNaviList([
          {
            name: '학생 기록 확인',
            list: [
              { name: '수업', link: '/parentSystem/lectures' },
              { name: '시험', link: '/parentSystem/tests' },
              { name: '등/하원 기록', link: '/parentSystem/eRecord' },
            ]
          }
        ]);
      }
    });
  }, [router.pathname]);

  return (
    <div>
      <Head>
        <title>학부모 시스템 : 오일러EDU</title>
      </Head>
      <BLayout
        naviName="학부모 시스템"
        naviList={ naviList }
      >
        { props.children }
      </BLayout>
    </div>
  )
}

export default Layout

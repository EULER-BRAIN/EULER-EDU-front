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
      if (!data.isTeacher) {
        // FIXME
        router.replace('/');
      } else {
        const list = [];
        if (data.level === 'administrator') {
          list.push({
            name: '메인 페이지 관리',
            list: [
              { name: '갤러리', link: '/management/main/gallery' },
              { name: '어워드', link: '/management/main/award' },
              { name: '오일러BOOKS', link: '/management/main/books' },
              { name: '오일러BLOG', link: '/management/main/blog' },
            ]
          });
          list.push({
            name: '시스템 관리',
            list: [
              { name: '캠퍼스', link: '/management/system/campus' },
            ]
          });
        }
        if (data.level === 'teacher' || data.level === 'administrator') {
          list.push({
            name: '캠퍼스 관리',
            list: [
              { name: '메인/공지', link: '/management/campus/notice' },
              { name: '메인/포스터', link: '/management/campus/poster' },
              { name: '메인/캠퍼스 정보', link: '/management/campus/main' },
              { name: '선생님', link: '/management/campus/teacher' },
            ]
          });
        }
        setNaviList(list);
      }
    });
  }, [router.pathname]);

  return (
    <div>
      <Head>
        <title>관리 : 오일러EDU</title>
      </Head>
      <BLayout
        naviName="학원 관리"
        naviList={ naviList }
      >
        { props.children }
      </BLayout>
    </div>
  )
}

export default Layout

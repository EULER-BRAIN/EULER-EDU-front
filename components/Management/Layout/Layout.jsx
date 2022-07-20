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
        router.replace('/');
      }
      else {
        const list = [];
        if (data.level === 'administrator') {
          list.push({
            name: '메인 페이지 관리',
            list: [
              { name: '갤러리', link: '/management/main/gallery', id: 'main/gallery' },
              { name: '어워드', link: '/management/main/award', id: 'main/award' },
              { name: '오일러BOOKS', link: '/management/main/books', id: 'main/books' },
              { name: '오일러BLOG', link: '/management/main/blog', id: 'main/blog' },
            ]
          });
        }
        setNaviList(list);
      }
    });
  }, []);

  return (
    <BLayout
      naviName="학원 관리"
      naviList={ naviList }
      page={ props.page }
    >
      { props.children }
    </BLayout>
  )
}

export default Layout

import { useState, useEffect } from 'react';
import { hrefParse } from '@tools/getHref';
import { useRouter } from 'next/router';
import axiosEDU from './axiosEDU';

const useCampusOnManagement = () => {
  const router = useRouter();
  const [campus, setCampus] = useState(router.query.campus);

  useEffect(() => {
    let _campus = router.query.campus;
    if (_campus) {
      if (_campus !== campus) setCampus(_campus);
    } else {
      axiosEDU.get('/login/getInfo/campus').then(({ data }) => {
        _campus = data?.campus;
        if (_campus !== campus) setCampus(_campus);
      })
    }
  }, [router.query.campus, router.pathname]);

  return campus;
}

export { useCampusOnManagement }

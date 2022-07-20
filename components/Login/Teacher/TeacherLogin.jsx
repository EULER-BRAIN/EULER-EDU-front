import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Skeleton, Input, BtnLogin, RedMsg, Loading } from '../Layout';
import axiosEDU from '@tools/axiosEDU';

const TeacherLogin = () => {
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('');
  const [unable, setUnable] = useState(false);
  const [loginCheck, setLoginCheck] = useState(null);
  const onCall = useRef(false);

  useEffect(() => {
    axiosEDU.get('/login/getInfo').then(({ data }) => {
      if (data.isLogined) setLoginCheck(false);
      else setLoginCheck(true);
    });
  }, []);

  const updateId = (x) => {
    if (RegExp("^[a-z0-9_-]{0,20}$").test(x)) {
      setId(x);
      if (msg !== '') setMsg('');
    }
  }
  const updatePw = (x) => {
    if (RegExp("^.{0,30}$").test(x)) {
      setPw(x);
      if (msg !== '') setMsg('');
    }
  }
  const onLogin = async () => {
    if (!onCall.current) {
      onCall.current = true;
      setUnable(true);
      try {
        const res = await axiosEDU.post("/login/try/teacher", { id, pw });
        const result = res?.data?.result;
        if (result) {
          // FIXME : replace url
          router.replace('/');
        }
        else {
          const msg = res?.data?.msg;
          if (msg) setMsg(msg);
          else setMsg('로그인에 실패하였습니다.');
          onCall.current = false;
          setUnable(false);
        }
      } catch (e) {
        onCall.current = false;
        setUnable(false);
      }
    }
  }

  let body = <Loading />;
  if (loginCheck === true) {
    body = (
      <div style={{
        paddingTop: '20px',
        marginLeft: '10px',
        marginRight: '10px'
      }}>
        <Input
          type="txt"
          placeholder="아이디"
          value={ id }
          update={ updateId }
          onEnter={ onLogin }
        />
        <div style={{ height: '10px' }} />
        <Input
          type="password"
          placeholder="비밀번호"
          value={ pw }
          update={ updatePw }
          onEnter={ onLogin }
        />
        <RedMsg>{ msg }</RedMsg>
        <div style={{ height: '10px' }} />
        <BtnLogin
          unable={ unable }
          onClick={ onLogin }
        />
      </div>
    );
  }
  else if (loginCheck === false) {
    body = (
      <div
        style={{
          paddingTop: '30px',
          textAlign: 'center',
          fontSize: '13px'
        }}
        className="FLight"
      >
        이미 로그인되어 있습니다.
      </div>
    )
  }

  return (
    <Skeleton
      subTitle="선생님 로그인"
    >
      { body }
    </Skeleton>
  )
}

export default TeacherLogin

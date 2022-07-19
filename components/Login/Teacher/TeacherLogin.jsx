import { useState, useRef } from 'react';
import { useRouter } from 'next/router'
import { Skeleton, Input, BtnLogin, RedMsg } from '../Layout';
import Load from '@components/Layout/Loading';
import axiosEDU from '@tools/axiosEDU';

const TeacherLogin = () => {
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('');
  const onCall = useRef(false);

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
      try {
        const res = await axiosEDU.post("/login/try/teacher", { id, pw });
        const result = res?.data?.result;
        if (result) {
          router.push('/management');
        }
        else {
          const msg = res?.data?.msg;
          if (msg) setMsg(msg);
          else setMsg('로그인에 실패하였습니다.');
          onCall.current = false;
        }
      } catch (e) {
        onCall.current = false;
      }
    }
  }

  return (
    <Skeleton
      subTitle="선생님 로그인"
    >
      <Load />
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
        <BtnLogin onClick={ onLogin } />
      </div>
    </Skeleton>
  )
}

export default TeacherLogin

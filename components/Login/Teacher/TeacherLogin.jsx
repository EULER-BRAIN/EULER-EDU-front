import { useState } from 'react';
import { Skeleton, Input, BtnLogin } from '../Layout'

const TeacherLogin = () => {
  return (
    <Skeleton
      subTitle="선생님 로그인"
    >
      <div style={{
        paddingTop: '20px',
        marginLeft: '10px',
        marginRight: '10px'
      }}>
        <Input
          type="txt"
          placeholder="아이디"
        />
        <div style={{ height: '10px' }} />
        <Input
            type="password"
            placeholder="비밀번호"
        />
        <div style={{ height: '10px' }} />
        <BtnLogin />
      </div>
    </Skeleton>
  )
}

export default TeacherLogin

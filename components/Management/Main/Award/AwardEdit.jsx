import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import LoadingDiv from "@components/Layout/Loading";
import { Content, Title, TopBackLay, TopFlexBtn, TopFlexSaved, TopFlexText, TopInput } from "@components/ParentSystem/Layout/LSet";
import axiosEDU from "@tools/axiosEDU";
import axios from "axios";
import { date2Str } from "@tools/trans";
import getS3ImgUrl from "@tools/getS3ImgUrl";
import regExpTest from "@tools/regExpTest";

const S3Image = (props) => {
  const styleLayDBtm = {
    paddingTop: '5px',
    display: 'flex',
    justifyContent: 'right',
    gap: '5px'
  }

  const router = useRouter();
  const onCall = useRef(null);
  const [image, setImage] = useState(undefined);
  const onChange = (e) => {
    setImage(e.target.files?.[0]);
  }
  const onUpload = () => {
    if (!onCall.current && image) {
      onCall.current = true;
      axiosEDU.get(`/management/main/award/img/upload/${ props.id }`).then(async ({ data }) => {
        if (data.url) {
          try {
            const response = await axios({
              url: data.url,
              method: "put",
              data: image,
              headers: {
                "Content-Type": "image/png"
              },
            });
            onCall.current = false;
            if (response.status !== 200) {
              console.log(response);
              alert('S3 Error : 요청 거부됨')
            }
            else {
              alert('이미지가 성공적으로 업로드되었습니다')
              router.reload();
            }
          } catch (e) {
            // FIXME
            console.log(e)
            onCall.current = false;
            alert('S3 Error : 요청 거부됨')
          }
        }
        else {
          onCall.current = false;
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }
  const onDelete = () => {
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.get(`/management/main/award/img/delete/${ props.id }`).then(({ data }) => {
        onCall.current = false;
        if (data.award) {
          alert('이미지가 성공적으로 삭제되었습니다')
          router.reload();
        }
        else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }

  return (
    <div>
      {
        props.exist ? (
          <div style={{
            width: '200px',
            height: '200px',
            background: 'rgb(200,200,200)'
          }}>
            <Image
              src={ getS3ImgUrl(`awards/${ props.id }.png`) }
              alt={ `awards/${ props.id }` }
              width={ 200 }
              height={ 200 }
            />
          </div>
        ) : (
          <div>
            <div style={{
              paddingBottom: '10px',
              fontSize: '14px',
              color: 'gray'
            }}>
              S3에 &quot;{ props.id }&quot;에 해댱하는 이미지가 없습니다.<br />
              image/png 형식의 파일만 업로드가 가능합니다.
            </div>
            <input
              type="file"
              accept="image/png"
              onChange={ onChange }
            />
          </div>
        )
      }
      {
        props.exist ? (
          <div style={ styleLayDBtm }>
            <TopFlexBtn
              onClick={ onDelete }
            >
              이미지 삭제
            </TopFlexBtn>
          </div>
        ) : (
          <div style={ styleLayDBtm }>
            <TopFlexBtn
              onClick={ onUpload }
            >
              이미지 추가
            </TopFlexBtn>
          </div>
        )
      }
    </div>
    
  )
}

const AwardEdit = (props) => {
  const [award, setAward] = useState(null);
  const [imgFound, setImgFound] = useState();
  const [inputValue, setInputValue] = useState({});

  useEffect(() => {
    axiosEDU.get(`/management/main/award/info/${ props.id }`).then(({ data }) => {
      if (data.award) {
        setAward(data.award);
        setImgFound(data.imgFound);
        setInputValue(data.award);
      } 
      else {
        // FIXME
      }
    });
  }, [props.id]);

  const styleLayD = {
    borderBottom: '1px solid rgb(206,206,206)',
    padding: '10px',
  }
  const styleLayDTop = {
    paddingBottom: '5px',
    display: 'flex',
    gap: '5px'
  }
  const styleLayDBtm = {
    paddingTop: '5px',
    display: 'flex',
    justifyContent: 'right',
    gap: '5px'
  }

  const router = useRouter();
  const onCall = useRef();
  const onClickName = () => {
    const name = inputValue.name;
    if (!regExpTest.awardName(name)) {
      return alert(regExpTest.awardName.toString()+' 을 만족해야 합니다')
    }
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post('/management/main/award/edit/name', {
        id: props.id,
        name: name
      }).then(({ data }) => {
        onCall.current = false;
        if (data.award) {
          setAward(data.award);
        } else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }
  const onClickContent = () => {
    const content = inputValue.content;
    if (!regExpTest.awardContent(content)) {
      return alert(regExpTest.awardContent.toString()+' 을 만족해야 합니다')
    }
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post('/management/main/award/edit/content', {
        id: props.id,
        content: content
      }).then(({ data }) => {
        onCall.current = false;
        if (data.award) {
          setAward(data.award);
        } else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }
  const onClickIsShow = (isShow) => () => {
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post('/management/main/award/edit/isShow', {
        id: props.id,
        isShow: isShow
      }).then(({ data }) => {
        onCall.current = false;
        if (data.award) {
          setAward(data.award);
        } else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }
  const onClickDelete = () => {
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.get(`/management/main/award/delete/${ props.id }`).then(({ data }) => {
        onCall.current = false;
        if (data.result) {
          alert('해당 어워드가 삭제되었습니다')
          router.replace('/management/main/award');
        }
        else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }

  return (
    <div>
      <Title>어워드 수정</Title>
      <Content>
        {
          award ? (
            <div>
              <TopBackLay />
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>ID</TopFlexText>
                </div>
                <TopInput
                  value={ award._id }
                />
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>제목</TopFlexText>
                  <TopFlexSaved token={ award.name === inputValue.name } />
                </div>
                <TopInput
                  value={ inputValue.name }
                  onChange={ (x) => {
                    if (RegExp("^.{0,30}$").test(x)) {
                      setInputValue({
                        ...inputValue,
                        name: x
                      })
                    }
                  } }
                />
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ onClickName }
                  >제목 수정</TopFlexBtn>
                </div>
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>내용</TopFlexText>
                  <TopFlexSaved token={ award.content === inputValue.content } />
                </div>
                <TopInput
                  value={ inputValue.content }
                  onChange={ (x) => {
                    if (RegExp("^.{0,50}$").test(x)) {
                      setInputValue({
                        ...inputValue,
                        content: x
                      })
                    }
                  } }
                />
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ onClickContent }
                  >내용 수정</TopFlexBtn>
                </div>
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>공개 여부</TopFlexText>
                </div>
                <TopInput
                  value={ award.isShow ? '공개' : '비공개' }
                />
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ onClickIsShow(true) }
                  >공개로 수정</TopFlexBtn>
                  <TopFlexBtn
                    onClick={ onClickIsShow(false) }
                  >비공개로 수정</TopFlexBtn>
                </div>
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>등록 날짜</TopFlexText>
                </div>
                <TopInput
                  value={ date2Str(award.registDate) }
                />
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>S3 이미지</TopFlexText>
                </div>
                <S3Image
                  id={ award._id }
                  exist={ imgFound }
                />
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>어워드 삭제</TopFlexText>
                </div>
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ onClickDelete }
                  >어워드 삭제</TopFlexBtn>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ height: '20px' }} />
              <LoadingDiv />
            </div>
          )
        }
      </Content>
    </div>
  )
}

export default AwardEdit

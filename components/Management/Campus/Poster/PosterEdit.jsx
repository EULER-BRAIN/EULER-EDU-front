import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import LoadingDiv from "@components/Layout/Loading";
import { Content, Title, TopBackLay, TopFlexBtn, TopFlexSaved, TopFlexText, TopInput } from "@components/ParentSystem/Layout/LSet";
import axiosEDU from "@tools/axiosEDU";
import axios from "axios";
import { useCampusOnManagement } from "@tools/useSystemProp";
import convertImg from "@tools/convertImg";
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
  const onUpload = async () => {
    if (!onCall.current && image) {
      const imageAfter = await convertImg(image);
      if (!imageAfter) {
        return alert('이미지 변환에 실패하였습니다')
      }

      onCall.current = true;
      axiosEDU.post('/management/campus/poster/img/upload',{
        id: props.id,
        type: imageAfter.type,
        campus: props.campus
      }).then(async ({ data }) => {
        if (data.url && data.fields) {
          try {
            const formData = new FormData();
            for (const key in data.fields) {
              formData.append(key, data.fields[key]);
            }
            formData.append("file", imageAfter);
            const res = await axios.post(data.url, formData);
            onCall.current = false;
            if (res.status === 204) {
              alert('이미지가 성공적으로 업로드되었습니다')
              router.reload();
            }
            else {
              alert('Permission denied : 요청 거부됨')
            }
          } catch (e) {
            // FIXME
            console.log(e)
            onCall.current = false;
            alert('Permission denied : 요청 거부됨')
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
      axiosEDU.post('/management/campus/poster/img/delete', {
        id: props.id,
        campus: props.campus
      }).then(({ data }) => {
        onCall.current = false;
        if (data.poster) {
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
              src={ getS3ImgUrl(`posters/${ props.id }`) }
              alt={ `posters/${ props.id }` }
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
              S3에 &quot;{ props.id }&quot;에 해당하는 이미지가 없습니다.
            </div>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/heic"
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

const PosterEdit = (props) => {
  const campus = useCampusOnManagement();
  const [poster, setPoster] = useState(null);
  const [imgFound, setImgFound] = useState();
  const [inputValue, setInputValue] = useState({});

  useEffect(() => {
    axiosEDU.get(`/management/campus/poster/info/${ props.id }`).then(({ data }) => {
      if (data.poster) {
        setPoster(data.poster);
        setImgFound(data.imgFound);
        setInputValue(data.poster);
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

  const onCall = useRef();
  const router = useRouter();
  const onClickTitle = () => {
    const title = inputValue.title;
    if (!regExpTest.posterTitle(title)) {
      return alert(regExpTest.posterTitle.toString()+' 을 만족해야 합니다')
    }
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post('/management/campus/poster/edit/title', {
        campus: campus,
        id: props.id,
        title: title,
      }).then(({ data }) => {
        onCall.current = false;
        if (data.poster) {
          setPoster(data.poster);
        } else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }
  const onClickContent = () => {
    const content = inputValue.content;
    if (!regExpTest.posterContent(content)) {
      return alert(regExpTest.posterContent.toString()+' 을 만족해야 합니다')
    }
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post('/management/campus/poster/edit/content', {
        campus: campus,
        id: props.id,
        content: content,
      }).then(({ data }) => {
        onCall.current = false;
        if (data.poster) {
          setPoster(data.poster);
        } else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }
  const onClickLink = () => {
    const link = inputValue.link;
    if (!regExpTest.posterLink(link)) {
      return alert(regExpTest.posterLink.toString()+' 을 만족해야 합니다')
    }
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post('/management/campus/poster/edit/link', {
        campus: campus,
        id: props.id,
        link: link,
      }).then(({ data }) => {
        onCall.current = false;
        if (data.poster) {
          setPoster(data.poster);
        } else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }
  const onClickIsShow = (value) => {
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post('/management/campus/poster/edit/isShow', {
        campus: campus,
        id: props.id,
        isShow: value,
      }).then(({ data }) => {
        onCall.current = false;
        if (data.poster) {
          setPoster(data.poster);
        } else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }
  const onClickDelete = () => {
    if (!onCall.current) {
      onCall.current = true;
      axiosEDU.post('/management/campus/poster/delete', {
        id: props.id,
        campus: campus,
      }).then(({ data }) => {
        onCall.current = false;
        if (data.result) {
          alert('해당 포스터가 삭제되었습니다')
          router.replace(`/management/campus/poster?campus=${ campus }`);
        }
        else {
          alert('Permission denied : 요청 거부됨')
        }
      })
    }
  }

  return (
    <div>
      <Title>포스터 수정</Title>
      <Content>
        {
          poster ? (
            <div>
              <TopBackLay />
              { /*<div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>ID</TopFlexText>
                </div>
                <TopInput
                  value={ poster._id }
                />
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>작성자</TopFlexText>
                </div>
                <TopInput
                  value={ poster.author?.name }
                />
              </div> */ }
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>제목</TopFlexText>
                  <TopFlexSaved token={ poster.title === inputValue.title } />
                </div>
                <TopInput
                  value={ inputValue.title }
                  onChange={ (x) => {
                    if (RegExp("^.{0,30}$").test(x)) {
                      setInputValue({
                        ...inputValue,
                        title: x
                      })
                    }
                  } }
                />
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ onClickTitle }
                  >제목 수정</TopFlexBtn>
                </div>
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>내용</TopFlexText>
                  <TopFlexSaved token={ poster.content === inputValue.content } />
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
                  <TopFlexText>Url</TopFlexText>
                  <TopFlexSaved token={ poster.link === inputValue.link } />
                </div>
                <TopInput
                  value={ inputValue.link }
                  onChange={ (x) => {
                    if (RegExp("^.{0,100}$").test(x)) {
                      setInputValue({
                        ...inputValue,
                        link: x
                      })
                    }
                  } }
                />
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ onClickLink }
                  >Url 수정</TopFlexBtn>
                </div>
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>공개 여부</TopFlexText>
                </div>
                <TopInput
                  value={ poster.isShow ? '공개' : '비공개' }
                />
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ () => onClickIsShow(true) }
                  >공개로 수정</TopFlexBtn>
                  <TopFlexBtn
                    onClick={ () => onClickIsShow(false) }
                  >비공개로 수정</TopFlexBtn>
                </div>
              </div>
              { /*<div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>등록 날짜</TopFlexText>
                </div>
                <TopInput
                  value={ date2Str(poster.registDate) }
                />
              </div>*/ }
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>S3 이미지</TopFlexText>
                </div>
                <S3Image
                  id={ poster._id }
                  exist={ imgFound }
                  campus={ campus }
                />
              </div>
              <div style={ styleLayD }>
                <div style={ styleLayDTop }>
                  <TopFlexText>포스터 삭제</TopFlexText>
                </div>
                <div style={ styleLayDBtm }>
                  <TopFlexBtn
                    onClick={ onClickDelete }
                  >포스터 삭제</TopFlexBtn>
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

export default PosterEdit;

import LoadingDiv from "@components/Layout/Loading";
import { Content, Title } from "@components/ParentSystem/Layout/LSet";
import axiosEDU from "@tools/axiosEDU";
import { useEffect, useState } from "react";

const AwardEdit = (props) => {
  const [award, setAward] = useState(null);

  useEffect(() => {
    axiosEDU.get(`/management/main/award/info/${ props.id }`).then(({ data }) => {
      if (data.award) {
        setAward(data.award);
      } 
      else {
        // FIXME
      }
    });
  }, [props.id]);

  return (
    <div>
      <Title>선생님 수정</Title>
      <Content>
        {
          award ? (
            <div>
              { award._id }
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

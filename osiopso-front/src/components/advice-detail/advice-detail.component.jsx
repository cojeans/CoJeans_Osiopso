import { useNavigate } from "react-router-dom";
import {
  ProfileImageBox,
  UpperProfile,
  OotdDetailImage,
  UpperImage,
  UpperComment,
  LikeContainer,
  UpperLikeContainer,
  AlertContainer,
  HunsuButton,
  EachIcon,
} from "./advice-detail.styles";

import { ReactComponent as DetailComment } from "../../assets/detail-comment.svg";
import { ReactComponent as Alert } from "../../assets/alert.svg";
import { ReactComponent as Advice_like } from "../../assets/advice_like.svg";
import { ReactComponent as Advice_dislike } from "../../assets/advice_dislike.svg";
import Swal from "sweetalert2";

const AdviceDetail = () => {
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/advice/commentlist")
  }

  const goToAdviceCreate = ()=> {
    navigate("/advice/create")
  }

  const Report = ()=>{
    Swal.fire({
      title:'신고',
      text: "해당 게시물을 신고하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '신고하기'    
    }).then((result)=>{
      if (result.isConfirmed) {
        Swal.fire(
          "신고하였습니다."
        )
      }
    })
  }

  return (
    <div>
      <hr />
      <UpperProfile>
        <ProfileImageBox />
        MyNameIsMr.Umm
      </UpperProfile>

      <UpperImage>
        <OotdDetailImage />
        <UpperLikeContainer>
          <LikeContainer>
            <EachIcon>
              <Advice_like />
            </EachIcon>
            <EachIcon>
              <Advice_dislike />
            </EachIcon>
            <EachIcon>
              <DetailComment onClick={goToCheckoutHandler}/>
            </EachIcon>
          </LikeContainer>
          <AlertContainer>
            <Alert onClick={Report} />
          </AlertContainer>
        </UpperLikeContainer>
      </UpperImage>

      <UpperComment>
        <h5>여기가 게시글 내용</h5>
      </UpperComment>

      <HunsuButton>
        <button onClick={goToAdviceCreate}>훈수두기</button>
      </HunsuButton>
    </div>
  );
};

export default AdviceDetail;

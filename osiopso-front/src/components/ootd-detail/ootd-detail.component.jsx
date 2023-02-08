import { useNavigate } from "react-router-dom";
import {
  ProfileImageBox,
  UpperProfile,
  OotdDetailImage,
  UpperImage,
  CommentProfileImage,
  UpperComment,
  ClosetInput,
  LikeContainer,
  UpperLikeContainer,
  AlertContainer
} from "./ootd-detail.styles";

import { ReactComponent as Like } from "../../assets/like.svg";
import {ReactComponent as DetailComment} from "../../assets/detail-comment.svg";
import {ReactComponent as Alert} from "../../assets/alert.svg"
import Swal from "sweetalert2";
// const ootdDetail = [
//     'https://www.kdfnews.com/news/photo/202202/87406_87382_2149.jpg'
// ]

const OotdDetail = () => {
  const navigate = useNavigate();
  const goToOotdComment = ()=>{
    navigate("/ootd/comment")
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
      <hr/>
      <UpperProfile>
        <ProfileImageBox />
        MyNameIsMr.Umm
      </UpperProfile>

      <UpperImage>
        <OotdDetailImage />
            <UpperLikeContainer>
                <LikeContainer>
                  <Like />
                  <DetailComment onClick={goToOotdComment}/>             
                </LikeContainer>
                <AlertContainer>
                    <Alert onClick={Report}/>
                </AlertContainer>
            </UpperLikeContainer>
      </UpperImage>

      <UpperComment>
        <CommentProfileImage></CommentProfileImage>
        <ClosetInput type="text" autoFocus maxLength={50} value="댓글 입력하기.."/>
      </UpperComment>
    </div>
  );
};

export default OotdDetail;

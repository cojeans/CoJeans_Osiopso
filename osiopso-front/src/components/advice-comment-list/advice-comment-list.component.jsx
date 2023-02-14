import Swal from "sweetalert2";
import {
  CommentListContainer,
  AdviceImgBox,
  ContentBox,
  ImgBox
} from "./advice-commnet-list.styles";


const AdviceCommentList = () => {
  const Report = ()=>{
    Swal.fire({
      title:'신고',
      text: "해당 훈수를 신고하시겠습니까?",
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
      <CommentListContainer>
        <AdviceImgBox/>
        <ContentBox>
          <ImgBox>
          <img src="" alt="" />
          </ImgBox>
          <div>

          </div>
          <div>
            
          </div>
          <div>
            
          </div>
        </ContentBox>
      </CommentListContainer>

    </div>
  );
};

export default AdviceCommentList;

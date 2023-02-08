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

// import { ReactComponent as Like } from "../../assets/like.svg";
// import {ReactComponent as DetailComment} from "../../assets/detail-comment.svg";
// import {ReactComponent as Alert} from "../../assets/alert.svg"
import Swal from "sweetalert2";

import axios from "axios";

import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selector';
import { useEffect, useState } from "react";

import { VscTrash, VscHeart, VscComment, VscWarning } from "react-icons/vsc";


const defaultData = {
  comments: [],
  content: '',
  
}


const OotdDetail = () => {
  const navigate = useNavigate();
  const goToOotdComment = ()=>{
    navigate("/ootd/comment")
  }

  const location = useLocation();
  const id = location.state.id;

  const Token = useSelector(selectUser)
  const [ootdDetail, setOotdDetail]= useState(defaultData)

  const getDetailOotd = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/api/feed/ootd/${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      }
    })
      .then((res) => {
        console.log(res.data.responseData)
        setOotdDetail(res.data.responseData)
      })
      .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getDetailOotd()
  },[])

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
        <div>
          <VscHeart size="24" />
          <VscComment onClick={goToOotdComment}  size="24"  />  
          <span>{ ootdDetail.comments.length}</span>
          <VscWarning size="24" onClick={Report} />
          <VscTrash size="24"/>
        </div>
        <div>
          { ootdDetail.content}
        </div>
      </UpperImage>

      <UpperComment>
        <CommentProfileImage></CommentProfileImage>
        <ClosetInput type="text" autoFocus maxLength={50} />
      </UpperComment>
    </div>
  );
};

export default OotdDetail;

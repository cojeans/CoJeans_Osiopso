import { useLocation, useNavigate } from "react-router-dom";
import {
  ProfileImageBox,
  UpperProfile,
  AdviceDetailImage,
  UpperImage,
  UpperComment,
  UpperLikeContainer,
  IconBox,
  TrashBox,
  HunsuButton,
  EachIcon,
} from "./advice-detail.styles";

import { ReactComponent as DetailComment } from "../../assets/detail-comment.svg";
import { ReactComponent as Alert } from "../../assets/alert.svg";
import { ReactComponent as Advice_like } from "../../assets/advice_like.svg";
import { ReactComponent as Advice_dislike } from "../../assets/advice_dislike.svg";
import Swal from "sweetalert2";

import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import { useState, useEffect } from "react";
import { VscTrash, VscHeart, VscComment, VscWarning } from "react-icons/vsc";
import { FiThumbsUp,  FiThumbsDown, FiAlertTriangle, FiTrash2  } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";

const defaultForm = {
  cnt: 0,
  list: []
}

const AdviceDetail = () => {
  const navigate = useNavigate();

  const goToAdviceComment = ()=> {
    navigate("/advice/comment", {
      state: {
        id: id
      }
    })
  }


  const location = useLocation();
  const id= location.state.id

  const Token = useSelector(selectUser)
  const [advicedDetail, setAdviceDetail] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [userData, setUserData] = useState('')
  const [likeData, setLikeData] = useState(defaultForm)
  const [commentData, setCommentData] = useState(defaultForm)


  const getDetailAdvice = ()=>{
    axios({
      method: "get",
      url: `http://localhost:8080/api/feed/advice/${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`
      }
    })
    .then((res)=>{
      // console.log(res.data.responseData)
      const result = res.data.responseData
      setAdviceDetail(result)
      setPhotoUrl(result.photos[0].imageUrl)
      setCommentData({cnt : result.comments.length, list: result.comments})
      setLikeData({cnt: result.articleLikes.length, list: result.articleLikes})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const deleteAdvice = ()=> {
    axios({
      method: "delete",
      url: `http://localhost:8080/api/feed/article/${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      }
    })
    .then((res)=>{
      console.log(res.data)
      Delete()
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  const Delete = ()=> {
    Swal.fire({
      icon: 'success',
      html: `
      훈수 게시물이 삭제되었습니다.
      `,
      confirmButtonColor: "#DD6B55",
    })
    .then(()=>{
      navigate("/advice")
    })
  }

  useEffect(()=>{
    getDetailAdvice()
  },[])


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
        <AdviceDetailImage>
          <img src={photoUrl} alt="" />
        </AdviceDetailImage>

        <UpperLikeContainer>
          <IconBox>
            <EachIcon>
              <FiThumbsUp size="20px"/>
            </EachIcon>
            <EachIcon>
              <FiThumbsDown size="20px"/>
            </EachIcon>
            <EachIcon>
              <FaRegComment onClick={goToCheckoutHandler} size="20px"/>
            </EachIcon>
            </IconBox>
            <TrashBox>
              <EachIcon>
                <FiTrash2 onClick={deleteAdvice} size="20px"/>
              </EachIcon>
              <EachIcon>
                <FiAlertTriangle onClick={Report} size="20px"/>
              </EachIcon>
            </TrashBox>

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

import { useNavigate } from "react-router-dom";
import {
  ProfileImageBox,
  UpperProfile,
  OotdDetailImage,
  UpperImage,
  UpperComment,
  IconBox,
  IconMessageBox,
  DetailContainer
} from "./ootd-detail.styles";

// import { ReactComponent as Like } from "../../assets/like.svg";
// import {ReactComponent as DetailComment} from "../../assets/detail-comment.svg";
// import {ReactComponent as Alert} from "../../assets/alert.svg"
import Swal from "sweetalert2";

import axios from "axios";

import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser, selectUserInfo } from '../../store/user/user.selector';
import { useEffect, useState } from "react";

import { VscTrash, VscHeart, VscComment, VscWarning } from "react-icons/vsc";

import OotdCommentCreate from "../ootd-comment-create/ootd-comment-create.component";
import OotdCommentList from "../ootd-comment-list/ootd-comment-list.component"

const defaultForm = {
  cnt: 0,
  list : []
}
const OotdDetail = () => {
  const navigate = useNavigate();
 

  const location = useLocation();
  const id = location.state.id;
  const {cnt, list} = defaultForm

  const Token = useSelector(selectUser)
  const [ootdDetail, setOotdDetail]= useState('')
  const [phtoUrl, setPhotoUrl] = useState('')
  const [likeData, setLikeData] = useState(defaultForm)
  const [commentData, setCommentData] = useState(defaultForm)
  const userInfo = useSelector(selectUserInfo)

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
        const result = res.data.responseData
        setOotdDetail(result)
        setPhotoUrl(result.photos[0].imageUrl)
        setCommentData({cnt : result.comments.length , list: result.comments.reverse()})
        setLikeData({cnt : result.articleLikes.length , list: result.articleLikes})
      })
      .catch((err) => {
      console.log(err)
      })
    
  }

  const deleteOotd = () => {
    axios({
      method: "delete",
      url: `http://localhost:8080/api/feed/article/${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      }
    })
      .then((res) => {
        console.log(res.data)
         Delete()
        
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

  const Delete = () => {
      Swal.fire({
      icon: 'success',
       html: `
        OOTD 게시물이 삭제되었습니다.
      `,
      confirmButtonColor: "#DD6B55", 
    })
      .then(() => {
        navigate("/ootd")
    })
  }


  return (
    <div>
      <UpperProfile
      >
        <ProfileImageBox >
          <img src={  userInfo.imageUrl ==='UNKNOWN'? require('../../assets/defaultuser.png'):userInfo.imageUrl} alt="" />
        </ProfileImageBox >
        {userInfo.name}
      </UpperProfile>

      <UpperImage>
        <OotdDetailImage>
          <img src={phtoUrl } alt="" />
        </OotdDetailImage>
        <DetailContainer>
          <IconMessageBox>
            <VscHeart size="25" />
            <span>{ likeData.cnt }</span>
            <VscComment size="25"  />  
            <span>{ commentData.cnt }</span>
          </IconMessageBox>
          <IconBox>
            <VscWarning size="25" onClick={Report} />
            <VscTrash size="25" onClick={deleteOotd}/>
          </IconBox>
        </DetailContainer>
        <DetailContainer>
          <span>
          {ootdDetail.content}
          </span>
        </DetailContainer>
      </UpperImage>

      <OotdCommentCreate
        articleId={ id }
        commentData= {commentData}
        setCommentData={setCommentData}
      />
      <OotdCommentList
        commentData={ commentData}
      />
    </div>
  );
};

export default OotdDetail;

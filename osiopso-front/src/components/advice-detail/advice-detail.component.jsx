import { useLocation, useNavigate } from "react-router-dom";

import {
  UpperProfile,
  ProfileImageBox,
  UpperImage,
  OotdDetailImage,
  DetailContainer,
  IconMessageBox,
  IconContainer,
  IconBox,
  ContentBox,
  Title,
  Buttoncontainer
} from "../ootd-detail/ootd-detail.styles";

import Button from "../button/button.component";

import Swal from "sweetalert2";

import { useSelector } from "react-redux";
import { selectUser, selectUserInfo } from "../../store/user/user.selector";
import { useState, useEffect, Fragment } from "react";

import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { VscTrash, VscComment, VscWarning } from "react-icons/vsc";

import axios from "axios";
const defaultForm = {
  cnt: 0,
  list: []
}

const AdviceDetail = () => {
  const location = useLocation();
  const id = location.state.id
  
  const navigate = useNavigate();

  const goToComment = ()=> {
    navigate("/advice/commentlist/"+id, {
      state: {
        id: id, 
        comments: commentData
      }
    })
  }



  const Token = useSelector(selectUser)
  const [advicedDetail, setAdviceDetail] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [userData, setUserData] = useState('')
  const [likeData, setLikeData] = useState(defaultForm)
  const [commentData, setCommentData] = useState(defaultForm)
  const [ootdUserUrl, setootdUserUrl] = useState(require('../../assets/defaultuser.png'))

  const userInfo = useSelector(selectUserInfo)

  const likeOotd = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_AXIOS_URL}feed/likearticle/${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      }
    })
      .then((res) => {
        console.log(res)
        getDetailAdvice()

      })
      .catch((err) => {
      console.log(err)
    })
  }



  const getDetailAdvice = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_AXIOS_URL}feed/advice/${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`
      }
    })
    .then((res)=>{
      console.log(res.data.responseData)
      const result = res.data.responseData
      setAdviceDetail(result)
      setPhotoUrl(result.photos[0].imageUrl)
      setootdUserUrl(result.profileImageUrl)
      setCommentData({cnt : result.comments.length, list: result.comments})
      const likeList = result.articleLikes

      if (likeList.length) {
        likeList.forEach((like) => {
          if (like.userId === userInfo.id) {
            setLikeData({ cnt: likeList.length, check: true, lst: likeList })
          } else{
            setLikeData({ cnt: likeList.length, check: false, lst: likeList})
          }
        })
      } else {
        setLikeData({ cnt: likeList.length, check: false, lst: likeList})
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const deleteAdvice = ()=> {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_AXIOS_URL}feed/article/${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      }
    })
    .then((res)=>{
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


  const goToCreateComment = () => {
    navigate('/advice/create-comment/', {
      state: {
        articleId: id,
        userId : advicedDetail.userId
      }
    })
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
    <Fragment>
      <div>
        <Title>
          {advicedDetail.subject }
        </Title>
      <UpperProfile 
      // onClick={}
      >
        <ProfileImageBox  >
              {
            advicedDetail.selected ?
              <img src={require('../../assets/defaultuser.png')} alt="" /> : <img src={ootdUserUrl} alt="" />   
        }
          </ProfileImageBox >
          {
            advicedDetail.selected ?
              '익명' : advicedDetail.userName    
        }
        
      </UpperProfile>

      <UpperImage>
          <OotdDetailImage>
           
          <img src={photoUrl } alt="" /> 
        </OotdDetailImage>
        <DetailContainer>
          <IconMessageBox>
            <IconContainer
              onClick={likeOotd}
            >
              {
                likeData.check
                  ? <AiFillHeart size="23" color="red"/>
                  : <AiOutlineHeart size="23" />
              }
              <div>{likeData.cnt}</div>
            </IconContainer>
            <IconContainer
              onClick={() => {
                goToComment()
              }
              }
            >
              <VscComment size="23"/>  
              <div>{ commentData.cnt }</div>
            </IconContainer>
          </IconMessageBox>
          <IconBox>
              <VscWarning size="23" onClick={Report} />
              {
                advicedDetail.userId === userInfo.id
                ?<VscTrash size="23" onClick={deleteAdvice}/>
                : ''
              }
          </IconBox>
        </DetailContainer>
        <DetailContainer>
          <ContentBox>
          {advicedDetail.content}
          </ContentBox>
        </DetailContainer>
        </UpperImage>
        <Buttoncontainer>
          <Button write={true} size='lg' onClick={goToCreateComment}>Advice</Button>
        </Buttoncontainer>
      </div>
    </Fragment>
  );
};

export default AdviceDetail;

import { useState } from "react";

import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectUser, selectUserInfo } from "../../store/user/user.selector";

// slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
//
import Swal from "sweetalert2";

import {
  CommentListContainer,
  AdviceImgBox,
  ContentBox,
  UserBox,
  UserInfo,
  IconContainer
} from "./advice-commnet-list.styles";

import { RiThumbDownLine, RiThumbUpLine } from "react-icons/ri";
import { VscTrash, VscWarning } from "react-icons/vsc";
import axios from "axios";
import { useEffect } from "react";
import { Fragment } from "react";

const AdviceCommentList = () => {
  	//slick
	const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 3,
			slidesToScroll: 1,
		variableWidth: true,
	};
	//slick

  const location = useLocation()
  const Token = useSelector(selectUser)
  const userInfo = useSelector(selectUserInfo)
  const id = location.state.id
  const [userImg, setUserImg] = useState(require('../../assets/defaultuser.png'))
  const [commentArr, setCommentArr] = useState([])
  const deleteComment = (coId) => {
    console.log(id, coId)
      axios({
      method: 'delete',
       url: `${process.env.REACT_APP_AXIOS_URL}comment/${id}/${coId}`,
        headers: {
          Authorization: `Bearer ${Token.token}`,
        },
    })
    .then((res)=>{
      console.log(res)
      getComment()
    })
    .catch((err)=>{
      console.log(err)
    })
  
  }
  const getComment = () => {
  axios({
      method: 'get',
       url: `${process.env.REACT_APP_AXIOS_URL}feed/advice/${id}`,
        headers: {
          Authorization: `Bearer ${Token.token}`,
        },
    })
    .then((res)=>{
      console.log(res)
      const result = res.data.responseData
      setCommentArr(result.comments)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getComment()
  },[])

  const Report = () => {
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
      {
      commentArr.length ?
        commentArr.map((comment) => {
          return (
            <Fragment>
          <CommentListContainer>
              <AdviceImgBox>

                <img src={ comment.imageUrl } alt="" />
              </AdviceImgBox>
              <ContentBox>
                <UserInfo>
                  <UserBox>
                    <img src={ userImg} alt="" />
                  </UserBox>
                  <div>username</div>
                </UserInfo>
                <IconContainer>
                  <div className="outer">
                    <div className="flex">
                      <RiThumbUpLine size='24' />
                      <div>{ comment.up}</div>
                    </div>
                    <div className="flex">
                      <RiThumbDownLine size='24'/>
                      <div>{ comment.down}</div>
                    </div>
                  </div>
                  <VscWarning size="24" onClick={Report} />
                    {
                      comment.userId === userInfo.id
                      ?<VscTrash size="23" onClick={()=>deleteComment(comment.commentId)}/>
                      : ''
                    }
                </IconContainer>
                <div className="content">
                  { comment.content}
                </div>
                <div className="time">
                  { comment.time}
                </div>
              </ContentBox>
         
            </CommentListContainer>
            <Slider {...settings}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Slider>
            </Fragment>
        )
        })
          :<div style={{textAlign:'center'}}>Advice가 없습니다.</div>
          
      }

   
    </div>
  );
};

export default AdviceCommentList;

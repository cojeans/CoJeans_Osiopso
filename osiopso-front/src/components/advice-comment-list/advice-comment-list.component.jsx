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

import { BsCheck2Circle } from "react-icons/bs";

import {
  CommentListContainer,
  AdviceImgBox,
  ContentBox,
  UserBox,
  UserInfo,
  IconContainer,
  ItemSlider
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
  const id = location.state.id
  const writeId = location.state.userId
  const Token = useSelector(selectUser)
  const userInfo = useSelector(selectUserInfo)

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
      const result = res.data.responseData
      console.log(result,'😎')
      setCommentArr(result.comments)
      console.log(result.comments)
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
                  {
                    writeId === userInfo.id ?
                    <div className="select">
                      <div>
                        <BsCheck2Circle size='17' />
                        <div>
                          채택
                        </div>
                      </div>
                    </div> : ''
                  }
                <UserInfo>
                    <UserBox>
                    <img src={ userImg } alt="" />
                  </UserBox>
                    <div className="username">익명</div>
                </UserInfo>
                <IconContainer>
                  <div className="outer">
                    <div className="flex">
                      <RiThumbUpLine size='17' />
                      <div>{ comment.up}</div>
                    </div>
                    <div className="flex">
                      <RiThumbDownLine size='17'/>
                      <div>{ comment.down}</div>
                    </div>
                  </div>
                  <VscWarning size="17" onClick={Report} />
                    {
                      comment.userId === userInfo.id
                      ?<VscTrash size="17" onClick={()=>deleteComment(comment.commentId)}/>
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
              <ItemSlider>
                <Slider {...settings}>
                  {
                    comment.itemList.map((item) => {
                      return (
                        <div className='imgBox'>
                          <img src={ item } alt="" />
                        </div>
                      )
                  })
                  }
              
              </Slider>
              </ItemSlider>
              <hr style={{color:'#D3D3D3', width:'90%'}}/>
            </Fragment>
        )
        })
          :<div style={{textAlign:'center'}}>Advice가 없습니다.</div>
          
      }

   
    </div>
  );
};

export default AdviceCommentList;

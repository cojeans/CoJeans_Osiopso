import { useState } from "react";

// import { useLocation } from "react-router";
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

const AdviceCommentList = ({id, userId}) => {
  	//slick
	const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 3,
			slidesToScroll: 1,
		variableWidth: true,
  };
  

	//slick

  // const location = useLocation()
  // const id = location.state.id


  const Token = useSelector(selectUser)
  const userInfo = useSelector(selectUserInfo)

  const [userImg, setUserImg] = useState(require('../../assets/defaultuser.png'))
  const [commentArr, setCommentArr] = useState([])
  const [isComplete, setIsComplete] = useState({
    check : false,
    cmt : {}
  })

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
      const result = res.data.responseData.comments
      console.log(result,'😎')
      const filterArr = result.filter((cmt)=>{
        if(cmt.isSelected !==true){
          return cmt
        }
      })
      setCommentArr(filterArr.reverse())
      result.forEach((cmt)=>{
        if (cmt.isSelected === true){
          setIsComplete({
            check:true,
            cmt : cmt
          })
        }
      })
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

  const upComment = (coId) => {
    axios({
        method: 'put',
         url: `${process.env.REACT_APP_AXIOS_URL}comment/up/${coId}`,
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
  

    const downComment = (coId) => {
      axios({
          method: 'put',
           url: `${process.env.REACT_APP_AXIOS_URL}comment/down/${coId}`,
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

      const selectComment = (coId) => {
        axios({
            method: 'put',
             url: `${process.env.REACT_APP_AXIOS_URL}comment/select/${coId}`,
              headers: {
                Authorization: `Bearer ${Token.token}`,
              },
          })
          .then((res)=>{
            console.log(res,'✔')
            getComment()
          })
          .catch((err)=>{
            console.log(err)
          })
        }


  return (
    <div>
            {/* 기술부채.. 담부터는 컴포넌트 분리하셈.. */}
              {/* 채택된거 */}
              
             { isComplete.check ?  <Fragment><CommentListContainer>
              <AdviceImgBox>
                <img src={ isComplete.cmt.imageUrl } alt="" />
              </AdviceImgBox>
                <ContentBox>
                    <div className="select" onClick={()=>selectComment(isComplete.cmt.commentId)}>
                      <div>
                          <BsCheck2Circle size='17' color="green"/>
                        <div>
                          채택
                        </div>
                      </div>
                    </div> 
                <UserInfo>
                    <UserBox>
                    <img src={  userImg } alt="" />
                  </UserBox>
                    <div className="username">익명</div>
                </UserInfo>
                <IconContainer>
                  <div className="outer">
                    <div className="flex" onClick={()=>upComment(isComplete.cmt.commentId)}>
                      <RiThumbUpLine size='17' />
                      <div>{ isComplete.cmt.up}</div>
                    </div>
                    <div className="flex" onClick={()=>downComment(isComplete.cmt.commentId)}>
                      <RiThumbDownLine size='17'/>
                      <div>{ isComplete.cmt.down}</div>
                    </div>
                  </div>
                  <VscWarning size="17" onClick={Report} />
                    {
                      isComplete.cmt.userId === userInfo.id
                      ?<VscTrash size="17" onClick={()=>deleteComment(isComplete.cmt.commentId)}/>
                      : ''
                    }
                </IconContainer>
                <div className="content">
                  { isComplete.cmt.content}
                </div>
                <div className="time">
                  { isComplete.cmt.time}
                </div>
              </ContentBox>
         
              </CommentListContainer>
              <ItemSlider>
                <Slider {...settings}>
                  {
                    isComplete.cmt.itemList.map((item) => {
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
            :''
            }
                {/* 채택된거 */}
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
                   ! isComplete.check && userId === userInfo.id && userId !== comment.userId?
                    <div className="select" onClick={()=>selectComment(comment.commentId)}>
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
                    <img src={  userImg } alt="" />
                  </UserBox>
                    <div className="username">익명</div>
                </UserInfo>
                <IconContainer>
                  <div className="outer">
                    <div className="flex" onClick={()=>upComment(comment.commentId)}>
                      <RiThumbUpLine size='17' />
                      <div>{ comment.up}</div>
                    </div>
                    <div className="flex" onClick={()=>downComment(comment.commentId)}>
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
          : !isComplete.check ?<div style={{textAlign:'center', marginTop:'10px 0'}}>Advice가 없습니다.</div>:''
          
      }

   
    </div>
  );
};

export default AdviceCommentList;

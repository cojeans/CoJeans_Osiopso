import axios from 'axios';
import Swal from "sweetalert2";

import { useEffect, useState } from 'react';
import {
  CommentProfileImage,
  UpperComment,
  ClosetInput,
  InputBox
} from './ootd-comment-create.styles'
import { ProfileImageBox } from '../ootd-detail/ootd-detail.styles';
import { selectUser, selectUserInfo } from '../../store/user/user.selector';
import { useSelector } from 'react-redux';

const OotdCommentCreate = ({ articleId, setCommentData, commentData, setOpenComment, getDetailOotd, isCocomment,setOpenCoco }) => {
  
  const [content, setContent] = useState("")
  const [cocoment, setCocoment] = useState("")
  
  useEffect(() => {
    setContent('')
    setCocoment('')
  }, [isCocomment])
  
  const handleChangeState = (e)=> {
    setContent(e.target.value)
  }
  const handleChangeCocoment = (e) => {
    setCocoment(e.target.value)
  }
  const Token = useSelector(selectUser)
  const userInfo = useSelector(selectUserInfo)
  const placeholer = `${isCocomment.selectCommentName}에 답글 달기`

  const createComment = () => {
    console.log(articleId)
    axios({
      method:"post",
      url: `${process.env.REACT_APP_AXIOS_URL}comment/${articleId}`,
      data:{
        content:content
      },
      headers: {
        Authorization: `Bearer ${Token.token}`,
			},
    })
    .then((res)=>{
      console.log(res.data)
      setCommentData({ ...commentData, cnt: commentData.cnt + 1 })
      getDetailOotd()

      setContent('')
      commentCreateAlert()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const createCocoment = () => {
    console.log('대댓글 달기입니다.')
    axios({
      method: "post",
      url: `${process.env.REACT_APP_AXIOS_URL}comment/${articleId}/${isCocomment.selectCommentId}`,
      data:{
        content:cocoment
      },
      headers: {
        Authorization: `Bearer ${Token.token}`,
			},
    })
      .then((res) => {
        console.log(res.data)
        getDetailOotd()
        setCocoment('')
        setOpenCoco({check:true, selectCommentId:isCocomment.selectCommentId })
      }).catch((err) => {
      console.log(err)
    })
  }

  const handleSubmit = () => {
    createComment()
    setOpenComment(true)
  }

  const commentCreateAlert = ()=>{
    Swal.fire({
     icon: 'success',
      confirmButtonColor: "#DD6B55", 
      html: `
        댓글이 작성되었습니다.
      `,
          showCancelButton: false,
          confirmButtonText: "확인",
    })
  }


  return (
    <div>
      <UpperComment>
        <ProfileImageBox >
          <img src={  userInfo.imageUrl ==='UNKNOWN'? require('../../assets/defaultuser.png'):userInfo.imageUrl} alt="" />
        </ProfileImageBox >

        {
          !isCocomment.check
            ?
            <InputBox>
              <ClosetInput
                type="text"
                autoFocus
                maxLength={50}
                placeholder='댓글 달기...'
                onChange={ handleChangeState}
                value={content}
              />
              <button onClick={handleSubmit}>게시</button>
            </InputBox>

            :
            <InputBox>
              <ClosetInput
                type="text"
                placeholder={ placeholer }
                autoFocus
                maxLength={50}
                onChange={handleChangeCocoment}
                value={cocoment}
              />
              <button onClick={createCocoment}>게시</button>
            </InputBox>
        }

      </UpperComment>
    </div>
  );
};

export default OotdCommentCreate
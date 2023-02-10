import axios from 'axios';
import Swal from "sweetalert2";

import { useEffect, useState } from 'react';
import {
  CommentProfileImage,
  UpperComment,
  ClosetInput,
} from './ootd-comment-create.styles'
import { ProfileImageBox } from '../ootd-detail/ootd-detail.styles';
import { selectUser, selectUserInfo } from '../../store/user/user.selector';
import { useSelector } from 'react-redux';

const OotdCommentCreate = ({ articleId, setCommentData, commentData, setOpenComment, getDetailOotd }) => {
  // const {cnt, list} = commentData
  const [content, setContent] = useState("")


  const handleChangeState = (e)=> {
    setContent(e.target.value)
  }
  const Token = useSelector(selectUser)
  const userInfo = useSelector(selectUserInfo)

  const createComment = () => {
    console.log(articleId)
    axios({
      method:"post",
      url: `http://localhost:8080/api/comment/${articleId}`,
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

        <ClosetInput
          type="text"
          autoFocus
          maxLength={50}
          placeholder="댓글 달기..."
          onChange={handleChangeState}
          value={content}
        />
        <button onClick={handleSubmit}>저장</button>
      </UpperComment>
    </div>
  );
};

export default OotdCommentCreate
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  CommentProfileImage,
  UpperComment,
  ClosetInput,
} from './ootd-comment-create.styles'
import { selectUser } from '../../store/user/user.selector';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const OotdCommentCreate = ({ articleId, setCommentData, commentData }) => {
  const {cnt, list} = commentData
  const [content, setContent] = useState("")


  const handleChangeState = (e)=> {
    console.log(e.target.value)
    setContent(e.target.value)
  }
  const Token = useSelector(selectUser)

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
      console.log(commentData)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleSubmit = () => {
    createComment()
  }



  return (
    <div>
      <UpperComment>
        <CommentProfileImage></CommentProfileImage>

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
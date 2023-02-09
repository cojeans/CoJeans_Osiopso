import axios from 'axios';
import { useRef, useState } from 'react';
import {
  CommentProfileImage,
  UpperComment,
  ClosetInput,
} from './ootd-comment-create.styles'
import { selectUser } from '../../store/user/user.selector';
import { useSelector } from 'react-redux';


const OotdCommentCreate = ({onCreate}) => {

  const [content, setContent] = useState("")


  const handleChangeState = (e)=> {
    console.log(e.target.value)
    setContent(e.target.value)
  }
  const Token = useSelector(selectUser)

  const createComment = () => {
    axios({
      method:"post",
      url: "http://localhost:8080/api/comment/1",
      data:{
        content:content
      },
      headers: {
        Authorization: `Bearer ${Token.token}`,
			},
    })
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const getComment = () =>{
    axios({
      
    })
  }

  const handleSubmit = () => {
    createComment()
  }



  return (
    <div>
      <h1>댓글 생성페이지</h1>


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
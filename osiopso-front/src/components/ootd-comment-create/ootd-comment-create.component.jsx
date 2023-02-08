import { useRef, useState } from 'react';
import {
  CommentProfileImage,
  UpperComment,
  ClosetInput,
} from './ootd-comment-create.styles'
const OotdCommentCreate = ({onCreate}) => {

  const [content, setContent] = useState("")


  // const [state, setState] = useState({
  //   content:""
  // })

  const contentInput = useRef()

  const handleChangeState = (e)=> {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = ()=> {
    if (state.content.length < 1) {
      contentInput.current.focus();
      return      
    }
    onCreate(state.content)
    alert('저장 성공')
  }


  return (
    <div>
      <h1>댓글 생성페이지</h1>

      <div>
        <input 
        name="comment"
        value={content} 
        onChange={(e)=>{
          setContent(e.target.value)
        }}/>

      <div>
      </div>

      </div>





      <UpperComment>
        <CommentProfileImage></CommentProfileImage>

        <ClosetInput
          type="text"
          autoFocus
          maxLength={50}
          placeholder="댓글 달기..."
        />
        <button type="submit">저장</button>
      </UpperComment>
    </div>
  );
};

export default OotdCommentCreate
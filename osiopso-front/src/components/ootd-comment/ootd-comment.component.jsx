import { 
    RoundProfileImage, 
    ProfileImageBox,
    UpperProfile, 
    OotdDetailImage, 
    UpperImage, 
    UpperLikeContainer,
    LikeContainer,
    AlertContainer,
    CommentProfileImage,
    UpperComment,
    ClosetInput,
} from './ootd-comment.styles'

import { ReactComponent as Like } from "../../assets/like.svg";
import {ReactComponent as DetailComment} from "../../assets/detail-comment.svg";
import {ReactComponent as Alert} from "../../assets/alert.svg"
import { useState, useRef } from 'react'
import { data } from 'dom7';
import Swal from 'sweetalert2';
import { useCallback } from 'react';

const OotdComment=()=>{
    const [value, setValue] = useState({
        content:''
    })
    
    const onChange = useCallback(
        (e) => {
            setValue(e.target.value)
        },
        [value]
    )

    // const onSubmit = useCallback(
    //     e=>{
    //         onInsert(value.name, value.content);
    //         setValue({
    //             content: ''
    //         })
    //         e.preventDefault();
    //     },
    //     [onInsert, value],
    // )

    
    

    

    const dataId = useRef(0)
    
    // const Oncreate = (content)=> {
    //     const created_date = new Date().getTime();
    //     const newItem= {
    //         // author,
    //         content,
    //         created_date,
    //         id: dataId.current
    //     }
    //     dataId.current += 1; 
    //     setCommentData([newItem, ...data ])
    //     content.preventDefault();
    // }

    // const handleSubmit = ()=> {
    //     if (commentData.content.length < 3) {
    //         alert("저장 성공")
    //         setCommentData({
    //             // author:"",
    //             content:"",
    //         })                   
    //     }
    // }

    const Report = ()=>{
        Swal.fire({
          title:'신고',
          text: "해당 댓글을 신고하시겠습니까?",
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
            <h1>OOTD 댓글 페이지</h1>
            <hr/>
      <UpperProfile>
        <ProfileImageBox />
        MyNameIsMr.Umm
      
            <UpperLikeContainer>
                <LikeContainer>
                  <Like />
                  <DetailComment/>             
                </LikeContainer>
                <AlertContainer>
                    <Alert onClick={Report}/>
                </AlertContainer>
            </UpperLikeContainer>
      </UpperProfile>

      <UpperComment>
        <CommentProfileImage></CommentProfileImage>

        <ClosetInput 
        type="text"
        autoFocus maxLength={50} 
        placeholder="댓글 달기..."
        value={value.content}
        onChange={onChange}
        />
        <button type="submit">저장</button>
      </UpperComment>
        </div>
    )
}

export default OotdComment
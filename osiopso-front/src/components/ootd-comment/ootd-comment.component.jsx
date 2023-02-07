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

const OotdComment=()=>{
    const [commentData, setCommentData] = useState([])

    const dataId = useRef(0)
    
    const Oncreate = (content)=> {
        const created_date = new Date().getTime();
        const newItem= {
            // author,
            content,
            created_date,
            id: dataId.current
        }
        dataId.current += 1; 
        setCommentData([newItem, ...data ])
        content.preventDefault();
    }

    const handleSubmit = ()=> {
        if (commentData.content.length < 3) {
            alert("저장 성공")
            setCommentData({
                // author:"",
                content:"",
            })                   
        }
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
                    <Alert/>
                </AlertContainer>
            </UpperLikeContainer>
      </UpperProfile>

      <UpperComment>
        <CommentProfileImage></CommentProfileImage>
        <form>
        <ClosetInput type="text" autoFocus maxLength={50} v-model/>
        <button onClick={Oncreate}>저장</button>
        </form>
      </UpperComment>
        </div>
    )
}

export default OotdComment
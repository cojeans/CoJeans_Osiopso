import {
    CommentContainer,
    UserPorfileBox,
    CommentBox,
    ContentBox,
    UpperContent,
    HeartIconBox
} from "./ootd-comment-list.styles"
import { BsHeart } from "react-icons/bs";

const OotdCommentList = ({ commentData }) => {
    
    return (
        <CommentContainer>
                {commentData.list.map((comment)=>(
                    <CommentBox key={comment.id}>
                        <UserPorfileBox>
                            <div className="imgBox">
                                <img src={  comment.imageUrl ==='UNKNOWN'? require('../../assets/defaultuser.png'):comment.imageUrl} alt="" />
                            </div>
                        </UserPorfileBox>
                        <ContentBox>
                            <UpperContent>
                                <div >{ comment.userName}</div>
                                <div className="time"> { comment.time} </div>
                            </UpperContent>
                            <div>{comment.content}</div>
                        </ContentBox>
                        <HeartIconBox>
                            <BsHeart />
                            <div className="heartCount">4</div>
                        </HeartIconBox>

                    </CommentBox>
                ))}
        </CommentContainer>
    )
}

export default OotdCommentList
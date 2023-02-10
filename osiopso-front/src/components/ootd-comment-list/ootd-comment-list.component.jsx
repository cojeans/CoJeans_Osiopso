import {
    CommentContainer,
    UserPorfileBox,
    CommentBox,
    CommentLargeBox,
    ContentBox,
    UpperContent,
    HeartIconBox
} from "./ootd-comment-list.styles"
import { BsHeart } from "react-icons/bs";

const OotdCommentList = ({ commentData }) => {
    
    return (
        <CommentContainer>
                {commentData.list.map((comment, idx)=>(
                    <CommentLargeBox key={idx}>
                        <CommentBox>
                            <UserPorfileBox>
                                <div className="imgBox">
                                    <img  src={  comment.imageUrl ==='UNKNOWN'? require('../../assets/defaultuser.png'):comment.imageUrl} alt="" />
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
                        <div>
                            댓글 더보기...
                        </div>
                    </CommentLargeBox>
                    
                ))}
        </CommentContainer>
    )
}

export default OotdCommentList
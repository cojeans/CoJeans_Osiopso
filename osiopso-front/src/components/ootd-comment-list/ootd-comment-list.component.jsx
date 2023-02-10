import {
    CommentContainer,
    UserPorfileBox,
    CommentBox,
    CommentLargeBox,
    ContentBox,
    UpperContent,
    HeartIconBox,
    Cocoment,
    CommentList,
    CocomentBox,
    CocomentList
} from "./ootd-comment-list.styles"
import { BsHeart } from "react-icons/bs";

const OotdCommentList = ({ commentData, setIsCocomment }) => {

    return (
        <CommentList>
            <CommentContainer>
                {commentData.list.map((comment, idx)=>(
                    <CommentLargeBox key={idx}>
                        <CommentBox tBox>
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
                        { comment.cocoments.length?
                            <CocomentBox>
                                <Cocoment onClick={()=>setIsCocomment({check:true, selectCommentId:comment.commentId})}>
                                답글 달기 
                                 </Cocoment>
                                <Cocoment>
                                    답글 보기 { comment.cocoments.length}
                                </Cocoment>
                            </CocomentBox>
                            
                            :
                            <CocomentBox>
                                <Cocoment onClick={() => setIsCocomment({ check: true, selectCommentId: comment.commentId })}>
                                    답글 달기 
                                </Cocoment>
                            </CocomentBox>
                        }
                        <CocomentList>
                            {
                                comment.cocoments.map((coco) => {
                                    return <div>
                                        {coco.imageUrl }
                                        {coco.userName }
                                        {coco.content}
                                        {coco.time}
                                    </div>
                                })
                           }
                        </CocomentList>
                    </CommentLargeBox>
                    
                ))}
            </CommentContainer>
        </CommentList>
    )
}

export default OotdCommentList
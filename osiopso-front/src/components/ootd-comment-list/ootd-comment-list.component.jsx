import {
    CommentContainer,
    CommentLargeBox,
    Cocoment,
    CommentList,
    CocomentBox,
    CocomentList
} from "./ootd-comment-list.styles"

import Comment from "../comment/comment.component";


const OotdCommentList = ({ commentData, setIsCocomment }) => {

    return (
        <CommentList>
            <CommentContainer>
                {commentData.list.map((comment, idx)=>(
                    <CommentLargeBox key={idx}>
                        <Comment
                            comment={comment }
                        />
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
                                    return <Comment
                                        comment={coco }
                                    />
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
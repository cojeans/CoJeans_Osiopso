import {
    CommentContainer,
    CommentLargeBox,
    Cocoment,
    CommentList,
    CocomentBox,
    CocomentList
} from "./ootd-comment-list.styles"

import Comment from "../comment/comment.component";


const OotdCommentList = ({ commentData, setIsCocomment, isCocomment, openCoco, setOpenCoco }) => {
    // const [openCoco, setOpenCoco] = useState(false)
    console.log(commentData)

    return (
        <CommentList>
            <CommentContainer>
                {commentData.list.map((comment, idx)=>(
                    <CommentLargeBox key={idx} select={ isCocomment.selectCommentId ===comment.commentId?true: false}>
                        {/* comment 컴포넌트 재활용했습니다. */}
                        <Comment
                            comment={comment}
                            
                        />
                        { comment.cocoments.length?
                            <CocomentBox>
                                <Cocoment onClick={()=>setIsCocomment({check:true, selectCommentId:comment.commentId, selectCommentName:comment.userName })}>
                                답글 달기 
                                </Cocoment>
                                {
                                    openCoco.selectCommentId === comment.commentId && openCoco.check
                                    ?<Cocoment onClick={()=>setOpenCoco({check:false, selectCommentId:comment.commentId,  })}>
                                        답글 접기
                                    </Cocoment>
                                        
                                    :<Cocoment onClick={()=>setOpenCoco({check:true, selectCommentId:comment.commentId, })}>
                                        답글 보기 { comment.cocoments.length}
                                    </Cocoment>
                                }
                            </CocomentBox>
                            
                            :
                            <CocomentBox>
                                <Cocoment onClick={() => setIsCocomment({ check: true, selectCommentId:comment.commentId, selectCommentName:comment.userName })}>
                                    답글 달기 
                                </Cocoment>
                            </CocomentBox>
                        }
                        {
                            openCoco.selectCommentId === comment.commentId && openCoco.check 
                            ?<CocomentList>
                                    {
                                    comment.cocoments.map((coco) => {
                                        {/* comment 컴포넌트 재활용했습니다. */}
                                        return <Comment
                                            comment={coco }
                                        />
                                    })
                            }
                            </CocomentList>
                           :''     
                        }
                    </CommentLargeBox>
                    
                ))}
            </CommentContainer>
        </CommentList>
    )
}

export default OotdCommentList
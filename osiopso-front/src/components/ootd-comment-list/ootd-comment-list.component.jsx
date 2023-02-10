import {
    CommentContainer,
    CommentLargeBox,
    Cocoment,
    CommentList,
    CocomentBox,
    CocomentList
} from "./ootd-comment-list.styles"

import Comment from "../comment/comment.component";
import { useState } from "react";


const OotdCommentList = ({ commentData, setIsCocomment, isCocomment, openCoco, setOpenCoco }) => {
    // const [openCoco, setOpenCoco] = useState(false)

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
                                    openCoco
                                    ?<Cocoment onClick={()=>setOpenCoco(false)}>
                                        답글 접기
                                    </Cocoment>
                                        
                                    :<Cocoment onClick={()=>setOpenCoco(true)}>
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
                            openCoco 
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
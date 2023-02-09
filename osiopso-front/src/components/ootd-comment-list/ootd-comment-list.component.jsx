const OotdCommentList = ({commentList})=> {
    return (
        <div className="CommentList">
            <h1>댓글 리스트들</h1>

            <div>
                {commentList.map((it)=>(
                    <div>
                        <div>내용: {it.content}</div>
                        <div>작성 시간(ms): {it.created_date}</div>

                    </div>
                ))}
            </div>


        </div>
    )
}

export default OotdCommentList
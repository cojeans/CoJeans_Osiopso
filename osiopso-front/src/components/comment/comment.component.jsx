import { 
	CommentBox,
	UserPorfileBox,
	ContentBox,
	UpperContent,
	HeartIconBox
 } from "../ootd-comment-list/ootd-comment-list.styles";

 import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
 import { VscTrash } from "react-icons/vsc";

import { useEffect, useState } from "react";

import { useSelector } from 'react-redux';
import { selectUser,selectUserInfo } from '../../store/user/user.selector';
import axios from "axios";


const defaultCommentLike = {
	lst: [],
	cnt: [],
	check: false,
}

const Comment = ({ comment, select, articleId, getDetailOotd }) => {
	const [commentLike, SetCommentLike] = useState(defaultCommentLike)
	const curUser = useSelector(selectUserInfo)// 현재 유저 정보를 가져옵니다. 
	const Token = useSelector(selectUser) // 현재 유저의 토큰 정보를 가져옵니다.

	//처음 댓글 렌더링이 될때 좋아요 상태를 불러옵니다.
	useEffect(() => {
		const lst = comment.commentLikes
		if (lst.length) {
			lst.forEach((like) => {		
				if (like.userId === curUser.id) {
					SetCommentLike({lst:comment.commentLikes, cnt:comment.commentLikes.length, check:true})
				} else {
					SetCommentLike({lst:comment.commentLikes, cnt:comment.commentLikes.length, check:false})
				}
			});
		} else {
			SetCommentLike({lst:comment.commentLikes, cnt:comment.commentLikes.length, check:false})
		}
	}, [])
	
	// 좋아요 버튼 눌렀을때 axios 호출
	const handleLikeComment = () => {
		axios({
			method: 'post',
			url: `${process.env.REACT_APP_AXIOS_URL}comment/likecomment/${comment.commentId}`,
			headers: {
        Authorization: `Bearer ${Token.token}`,
      }
		}).then((res) => {
			console.log(res);
			if (commentLike.check) {
				// 좋아요 된 상황
				SetCommentLike({...commentLike, cnt:commentLike.cnt-1, check:false})
			} else {
				SetCommentLike({...commentLike, cnt:commentLike.cnt+1, check:true})
			}
		}).catch((err) => {
			console.log(err);
		})
	}

	//댓글 삭제
	const deleteComment = () => {
		axios({
			method: 'delete',
			url: `${process.env.REACT_APP_AXIOS_URL}comment/${articleId}/${comment.commentId}`,
			headers: {
        Authorization: `Bearer ${Token.token}`,
      }
		}).then((res) => {
			console.log(res);
			getDetailOotd()
		}).catch((err) => {
			console.log(err);
		})
	}

	return (
		<CommentBox
			select={ select}>
			<UserPorfileBox>
					<div className="imgBox">
							<img  src={  comment.profileImageUrl ==='UNKNOWN'? require('../../assets/defaultuser.png'):comment.profileImageUrl} alt="" />
					</div>
			</UserPorfileBox>
			<ContentBox>
					<UpperContent>
							<div >{ comment.userName}</div>
							<div className="time"> { comment.time} </div>
					</UpperContent>
					<div>{comment.content}</div>
			</ContentBox>
			<HeartIconBox onClick={handleLikeComment}>
				{
					commentLike.check
					? <AiFillHeart size="16" color="red"/>
					: <AiOutlineHeart size="16" />
				}
				<div className="heartCount"><span>{ commentLike.cnt}</span></div>
			</HeartIconBox>
			{
				curUser.id === comment.userId 
				?
					<HeartIconBox onClick={deleteComment}>
						<VscTrash size="16"/>
					</HeartIconBox>
				:''
			}
		</CommentBox>
	)
 }
 
 export default Comment
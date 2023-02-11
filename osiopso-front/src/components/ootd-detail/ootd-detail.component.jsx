import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  ProfileImageBox,
  UpperProfile,
  OotdDetailImage,
  UpperImage,
  IconContainer,
  IconBox,
  IconMessageBox,
  DetailContainer,
  CommentListWrapper
} from "./ootd-detail.styles";

// import { ReactComponent as Like } from "../../assets/like.svg";
// import {ReactComponent as DetailComment} from "../../assets/detail-comment.svg";
// import {ReactComponent as Alert} from "../../assets/alert.svg"
import Swal from "sweetalert2";
  
import axios from "axios";

import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser, selectUserInfo } from '../../store/user/user.selector';
import { useEffect, useState } from "react";

import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { VscTrash, VscComment, VscWarning } from "react-icons/vsc";

import OotdCommentCreate from "../ootd-comment-create/ootd-comment-create.component";
import OotdCommentList from "../ootd-comment-list/ootd-comment-list.component"

const defaultForm = {
  cnt: 0,
  list : []
}

const isCocomentDefaultData = {
  check: false,
  selectCommentId: '',
  selectCommentName: '',
}

const openCocoDefaultData = {
  check: false,
  selectCommentId: '',
}

const likeDefaultData = {
  check: false,
  cnt: 0,
  lst:[]
}

const OotdDetail = () => {
  const navigate = useNavigate();
 
  const location = useLocation();
  const id = location.state.id;

  const Token = useSelector(selectUser)
  const [ootdDetail, setOotdDetail]= useState('')
  const [phtoUrl, setPhotoUrl] = useState('')
  const [likeData, setLikeData] = useState(likeDefaultData)
  const [commentData, setCommentData] = useState(defaultForm)
  const [openComment, setOpenComment] = useState(false)
  // isCocoment는 댓글 생성 창이 답글인지 댓글인지 판별하기 위한 것입니다.
  const [isCocomment, setIsCocomment] = useState(isCocomentDefaultData)
  const [ootdUserUrl, setOordUserUrl] = useState(require('../../assets/defaultuser.png'))
  const [openCoco, setOpenCoco] = useState(false)

  
  const userInfo = useSelector(selectUserInfo)
  const curRef1 = useRef(null); 

  const commentRef = useRef(null)

  	useEffect(() => {
		// 이벤트 핸들러 함수
		const handler = (event) => {
				// mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
				if (commentRef.current && !commentRef.current.contains(event.target)) {
					setIsCocomment(isCocomentDefaultData)
      }
		};
		
		// 이벤트 핸들러 등록
		document.addEventListener('mousedown', handler);
		// document.addEventListener('touchstart', handler); // 모바일 대응
		
		return () => {
				// 이벤트 핸들러 해제
				document.removeEventListener('mousedown', handler);
				// document.removeEventListener('touchstart', handler); // 모바일 대응
		};
	});

  const getDetailOotd = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/api/feed/ootd/${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      }
    })
      .then((res) => {
        const result = res.data.responseData
        console.log(result)
        setOotdDetail(result)
        setPhotoUrl(result.photos[0].imageUrl)
        setCommentData({ cnt: result.comments.length, list: result.comments.reverse() })
        const likeList = result.articleLikes
        console.log(likeList, userInfo.id)
        if (likeList.length) {
          likeList.forEach((like) => {
            if (like.userId === userInfo.id) {
              setLikeData({ cnt: likeList.length, check: true, lst: likeList })
            } else{
              setLikeData({ cnt: likeList.length, check: false, lst: likeList})
            }
          })
        } else {
          setLikeData({ cnt: likeList.length, check: false, lst: likeList})
        }
      })
      .catch((err) => {
      console.log(err)
      })
    
  }

  const deleteOotd = () => {
    axios({
      method: "delete",
      url: `http://localhost:8080/api/feed/article/${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      }
    })
      .then((res) => {
        console.log(res.data)
         Delete()
        
      })
      .catch((err) => {
      console.log(err)
      })
  }

  const likeOotd = () => {
    axios({
      method: "post",
      url: `http://localhost:8080/api/feed/likearticle/${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      }
    })
      .then((res) => {
        getDetailOotd()

      })
      .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getDetailOotd()

  },[])

  const Report = ()=>{
    Swal.fire({
      title:'신고',
      text: "해당 게시물을 신고하시겠습니까?",
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

  const Delete = () => {
      Swal.fire({
      icon: 'success',
       html: `
        OOTD 게시물이 삭제되었습니다.
      `,
      confirmButtonColor: "#DD6B55", 
    })
      .then(() => {
        navigate("/#ootd")
    })
  }
  const sccurRef1 = () => curRef1.current.scrollIntoView({ behavior: 'smooth' }); 

  const clickCommentIcon = () => {
    if (openComment) {
      setOpenComment(false)
    } else {
      setOpenComment(true)
    }
  }
  
  useEffect(() => {
    sccurRef1()
  },[openComment])


  return (
    <div>
      <div>

      <UpperProfile
      >
        <ProfileImageBox >
          <img src={  ootdUserUrl} alt="" />
        </ProfileImageBox >
        {ootdDetail.userName}
      </UpperProfile>

      <UpperImage>
        <OotdDetailImage>
          <img src={phtoUrl } alt="" />
        </OotdDetailImage>
        <DetailContainer>
          <IconMessageBox>
            <IconContainer
              onClick={likeOotd}
            >
              {
                likeData.check
                  ? <AiFillHeart size="23" color="red"/>
                  : <AiOutlineHeart size="23" />
              }
              <div>{likeData.cnt}</div>
            </IconContainer>
            <IconContainer
              onClick={() => {
                clickCommentIcon()
              }
              }
            >
              <VscComment size="23"/>  
              <div>{ ootdDetail.commentCnt }</div>
            </IconContainer>
          </IconMessageBox>
          <IconBox>
              <VscWarning size="23" onClick={Report} />
              {
                ootdDetail.userId === userInfo.id
                ?<VscTrash size="23" onClick={deleteOotd}/>
                : ''
              }
          </IconBox>
        </DetailContainer>
        <DetailContainer>
          <span>
          {ootdDetail.content}
          </span>
        </DetailContainer>
      </UpperImage>
      </div>
      {/* 댓글 아이콘 클릭시 리스트가 열리고 리스트 섹션으로 이동 */}
        {
        openComment && commentData.cnt
          ?<CommentListWrapper>
            <div onClick={()=>setOpenComment(false)}>접기</div>
            <OotdCommentList
              commentData={commentData}
              setIsCocomment={setIsCocomment}
              isCocomment={isCocomment}
              setOpenCoco={setOpenCoco}
              openCoco={ openCoco}
              />
          </CommentListWrapper>
          : ''
        }
      
      <div
      ref={commentRef}
      >  
        <OotdCommentCreate
        articleId={id}
        commentData={commentData}
        setCommentData={setCommentData}
        setOpenComment={setOpenComment}
        getDetailOotd={getDetailOotd}
        isCocomment={isCocomment}
        setOpenCoco={setOpenCoco}

        />
      </div>

      <div
        ref={curRef1}
      >
      </div>
    </div>
  );
};

export default OotdDetail;

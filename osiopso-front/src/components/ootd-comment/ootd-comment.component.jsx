import {

  ProfileImageBox,
  UpperProfile,

  UpperLikeContainer,
  LikeContainer,
  AlertContainer,

} from "./ootd-comment.styles";

import OotdCommentList from "../ootd-comment-list/ootd-comment-list.component";
import { ReactComponent as Like } from "../../assets/like.svg";
import { ReactComponent as DetailComment } from "../../assets/detail-comment.svg";
import { ReactComponent as Alert } from "../../assets/alert.svg";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import { useLocation } from 'react-router-dom';

import OotdCommentCreate from "../ootd-comment-create/ootd-comment-create.component";

const OotdComment = () => {
  const [data, setData] = useState([])

  const loacation = useLocation()
  const { articleId } = loacation.state.id

  const Report = () => {
    Swal.fire({
      title: "신고",
      text: "해당 댓글을 신고하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "신고하기",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("신고하였습니다.");
      }
    });
  };

  return (
    <div>
      <UpperProfile>
        <ProfileImageBox />
        MyNameIsMr.Umm
        <UpperLikeContainer>
          <LikeContainer>
            <Like />
            <DetailComment />
          </LikeContainer>
          <AlertContainer>
            <Alert onClick={Report} />
          </AlertContainer>
        </UpperLikeContainer>
      </UpperProfile>

    <OotdCommentList commentList={data}/>
    {/* <OotdCommentCreate articleId={articleId}/> */}
     
      {/* <UpperComment>
        <CommentProfileImage></CommentProfileImage>

        <ClosetInput
          type="text"
          autoFocus
          maxLength={50}
          placeholder="댓글 달기..."
          value={value.content}
          onChange={onChange}
        />
        <button type="submit">저장</button>
      </UpperComment> */}
    </div>
  );
};

export default OotdComment;

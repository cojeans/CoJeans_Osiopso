import {
  ProfileImageBox,
  UpperProfile,
  OotdDetailImage,
  UpperImage,
  CommentProfileImage,
  UpperComment,
  ClosetInput,
  LikeContainer,
  UpperLikeContainer,
  AlertContainer
} from "./ootd-detail.styles";

import { ReactComponent as Like } from "../../assets/like.svg";
import {ReactComponent as DetailComment} from "../../assets/detail-comment.svg";
import {ReactComponent as Alert} from "../../assets/alert.svg"
// const ootdDetail = [
//     'https://www.kdfnews.com/news/photo/202202/87406_87382_2149.jpg'
// ]

const OotdDetail = () => {
  return (
    <div>
      <hr/>
      <UpperProfile>
        <ProfileImageBox />
        MyNameIsMr.Umm
      </UpperProfile>

      <UpperImage>
        <OotdDetailImage />
            <UpperLikeContainer>
                <LikeContainer>
                  <Like />
                  <DetailComment/>             
                </LikeContainer>
                <AlertContainer>
                    <Alert/>
                </AlertContainer>
            </UpperLikeContainer>
      </UpperImage>

      <UpperComment>
        <CommentProfileImage></CommentProfileImage>
        <ClosetInput type="text" autoFocus maxLength={50} value="댓글 입력하기.."/>
      </UpperComment>
    </div>
  );
};

export default OotdDetail;

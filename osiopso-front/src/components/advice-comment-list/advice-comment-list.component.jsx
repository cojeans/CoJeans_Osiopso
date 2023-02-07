import { ReactComponent as AdviceCloth } from "../../assets/advice-cloth.svg";
import {
  ProfileImageBox,
  UpperProfile,
  ProfileName,
  AdviceBox,
  LikeDislikeBox,
  LikeContainer,
  AlertContainer,
  Box,
  ProfileAndName,
  AdviceContent,
  BottomBox,
} from "./advice-commnet-list.styles";
import { ReactComponent as Advice_like } from "../../assets/advice_like.svg";
import { ReactComponent as Advice_dislike } from "../../assets/advice_dislike.svg";
import { ReactComponent as Pink_alert } from "../../assets/pink_alert.svg";
import { ReactComponent as Advice_shoes } from "../../assets/advice_shoes.svg";

const AdviceCommentList = () => {
  return (
    <div>
      <h1>훈수목록</h1>
      <hr />

      <UpperProfile>
        <AdviceCloth />
        <ProfileAndName>
          <ProfileImageBox />
          <ProfileName>MyNameIsMr.Umm</ProfileName>
        </ProfileAndName>
        <AdviceBox>
          <Box>
            <LikeContainer>
              <LikeDislikeBox>
                <Advice_like />
              </LikeDislikeBox>
              <LikeDislikeBox>
                <Advice_dislike />
              </LikeDislikeBox>
            </LikeContainer>
            <AlertContainer>
              <Pink_alert />
            </AlertContainer>
          </Box>
          <AdviceContent>여기에 글이 옵니다.</AdviceContent>
        </AdviceBox>
      </UpperProfile>
      <BottomBox><Advice_shoes/></BottomBox>
      
   
      {/* <UpperProfile>
        <AdviceCloth />
        <ProfileAndName>
          <ProfileImageBox />
          <ProfileName>MyNameIsMr.Umm</ProfileName>
        </ProfileAndName>
        <AdviceBox>
          <Box>
            <LikeContainer>
              <LikeDislikeBox>
                <Advice_like />
              </LikeDislikeBox>
              <LikeDislikeBox>
                <Advice_dislike />
              </LikeDislikeBox>
            </LikeContainer>
            <AlertContainer>
              <Pink_alert />
            </AlertContainer>
          </Box>
          <AdviceContent>여기에 글이 옵니다.</AdviceContent>
        </AdviceBox>
      </UpperProfile> */}

      {/* <UpperProfile>
        <AdviceCloth />
        <ProfileAndName>
          <ProfileImageBox />
          <ProfileName>MyNameIsMr.Umm</ProfileName>
        </ProfileAndName>
        <AdviceBox>
          <Box>
            <LikeContainer>
              <LikeDislikeBox>
                <Advice_like />
              </LikeDislikeBox>
              <LikeDislikeBox>
                <Advice_dislike />
              </LikeDislikeBox>
            </LikeContainer>
            <AlertContainer>
              <Pink_alert />
            </AlertContainer>
          </Box>
          <AdviceContent>여기에 글이 옵니다.</AdviceContent>
        </AdviceBox>
      </UpperProfile> */}

    </div>
  );
};

export default AdviceCommentList;

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
  AdviceClothes,
  WearLikeThisBox,
  TotalContentBox,
} from "./advice-commnet-list.styles";
import { ReactComponent as Advice_like } from "../../assets/advice_like.svg";
import { ReactComponent as Advice_dislike } from "../../assets/advice_dislike.svg";
import { ReactComponent as Pink_alert } from "../../assets/pink_alert.svg";

const AdviceCommentList = () => {
  return (
    <div>
      <h1>훈수목록</h1>
      <hr />
      <TotalContentBox>
        <UpperProfile>
          <WearLikeThisBox>
            <img
              src={require("../../assets/advice_wear_like_this.png")}
              alt=""
            />
          </WearLikeThisBox>
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
        <BottomBox>
          <AdviceClothes>
            <img src={require("../../assets/advice_shirt.png")} alt="" />
          </AdviceClothes>
          <AdviceClothes>
            <img src={require("../../assets/advice_shirt2.png")} alt="" />
          </AdviceClothes>
          <AdviceClothes>
            <img src={require("../../assets/advice_pant.png")} alt="" />
          </AdviceClothes>
          <AdviceClothes>
            <img src={require("../../assets/advice_shoes.png")} alt="" />
          </AdviceClothes>
        </BottomBox>
      </TotalContentBox>
      <hr />

      <TotalContentBox>
        <UpperProfile>
          <WearLikeThisBox>
            <img
              src={require("../../assets/advice_wear_like_this.png")}
              alt=""
            />
          </WearLikeThisBox>
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
        <BottomBox>
          <AdviceClothes>
            <img src={require("../../assets/advice_shirt.png")} alt="" />
          </AdviceClothes>
          <AdviceClothes>
            <img src={require("../../assets/advice_shirt2.png")} alt="" />
          </AdviceClothes>
          <AdviceClothes>
            <img src={require("../../assets/advice_pant.png")} alt="" />
          </AdviceClothes>
          <AdviceClothes>
            <img src={require("../../assets/advice_shoes.png")} alt="" />
          </AdviceClothes>
        </BottomBox>
      </TotalContentBox>
      <hr />

    

    </div>
  );
};

export default AdviceCommentList;

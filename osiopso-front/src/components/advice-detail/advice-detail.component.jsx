import { 
    ProfileImageBox,
    UpperProfile,
    OotdDetailImage,
    UpperImage,
    UpperComment,
    LikeContainer,
    UpperLikeContainer,
    AlertContainer,
    HunsuButton
} from "./advice-detail.styles"

import {ReactComponent as DetailComment} from "../../assets/detail-comment.svg";
import {ReactComponent as Alert} from "../../assets/alert.svg"
import {ReactComponent as Advice_like} from "../../assets/advice_like.svg"
import {ReactComponent as Advice_dislike} from "../../assets/advice_dislike.svg"

const AdviceDetail = () => {
    return (
        <div>
        <hr />
        <UpperProfile>
          <ProfileImageBox />
          MyNameIsMr.Umm
        </UpperProfile>
  
        <UpperImage>
          <OotdDetailImage />
              <UpperLikeContainer>
                  <LikeContainer>
                    <Advice_like/>
                    <Advice_dislike/>
                    <DetailComment/>             
                  </LikeContainer>
                  <AlertContainer>
                      <Alert/>
                  </AlertContainer>
              </UpperLikeContainer>
        </UpperImage>
  
        <UpperComment>
          
          <h5>여기가 게시글 내용</h5>
        </UpperComment>

        <HunsuButton>
        <button>훈수두기</button>
        </HunsuButton>
      </div>
    )
}

export default AdviceDetail
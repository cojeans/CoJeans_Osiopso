import {
  Xcontainer,
  TopContainer,
  BottomContainer,
  MarginDiv,
} from "./ootd-create.styles";
import { ReactComponent as BestOotd } from "../../assets/bestootd.svg";

const OotdCreate = () => {
  return (
    <div>
      <TopContainer>
        <Xcontainer>
          <img src={require("../../assets/X.png")} alt="" />
        </Xcontainer>
        <h3>새 게시물</h3>
      </TopContainer>
      <BottomContainer>
        <div>
          <BestOotd />
        </div>
        <MarginDiv>
          <button>스타일 태그 추가하기</button>
        </MarginDiv>
        <MarginDiv>
          <textarea name="" id="" cols="30" rows="10">
            문구를 입력하세요..
          </textarea>
        </MarginDiv>
        <button>저장하기</button>
      </BottomContainer>
    </div>
  );
};

export default OotdCreate;

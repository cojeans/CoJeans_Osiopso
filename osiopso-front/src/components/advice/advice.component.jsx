import { HunsuImages, TopTag, Container, UpperupperCommentContainer, UpperCommentContainer, CommentContainer, EachBox  } from "./advice.styles";
import { TextToLeft } from "../../routes/home/home.styles";
import { useNavigate } from "react-router-dom"
import { ReactComponent as Comment} from "../../assets/comment.svg"
import { FaRegComment } from "react-icons/fa"
import { BiHeart } from "react-icons/bi";


const Advice = () => {
  const navigate = useNavigate();
  const goToCheckoutHandler = ()=>{
    navigate("create");
  }
  const goToDetail = ()=> {
    navigate("detail");
  }

  return (
    <div>
      <h1>훈수페이지 입니다.</h1>
      <TextToLeft>
        <Container>
          <span>최신순</span> <span>논란순</span>
        </Container>
      </TextToLeft>

      <TextToLeft>
        <TopTag>
          <h4>채택 중</h4> <h4>채택완료</h4>
        </TopTag>
      </TextToLeft>

      <HunsuImages>
        {/* <Container> */}
          {/* <UpperupperCommentContainer> */}
            {/* <UpperCommentContainer> */}
            <EachBox>
            <img src={require('../../assets/Mr_Umm.png')} alt="" onClick={goToDetail}/> 
              <CommentContainer>
            <FaRegComment color="black"/>
            <BiHeart/>
              </CommentContainer>
            </EachBox>
            <img src={require('../../assets/shit1.png')} alt="" onClick={goToDetail}/>  
            <img src={require('../../assets/shit2.png')} alt="" onClick={goToDetail}/> 
            <img src={require('../../assets/shit3.png')} alt="" onClick={goToDetail}/> 
            <img src={require('../../assets/shit4.png')} alt="" onClick={goToDetail}/> 
            <img src={require('../../assets/shit5.png')} alt="" onClick={goToDetail}/> 
            {/* </UpperCommentContainer> */}
          {/* </UpperupperCommentContainer> */}
        {/* </Container> */}
      </HunsuImages>

    </div>
  );
};

export default Advice;

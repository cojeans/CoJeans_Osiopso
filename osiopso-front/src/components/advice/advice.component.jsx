import {
  HunsuImages,
  TopTag,
  Container,
  UpperupperCommentContainer,
  UpperCommentContainer,
  CommentContainer,
  EachBox,
  TrashcanContainer,
  IconBigBox,
} from "./advice.styles";
import { TextToLeft } from "../../routes/home/home.styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as Comment } from "../../assets/comment.svg";
import { selectUser } from "../../store/user/user.selector";
import { VscHeart, VscComment } from "react-icons/vsc";

import axios from "axios";
import { useEffect, useState } from "react";

const Advice = () => {
  const Token = useSelector(selectUser);

  const [adviceArticle, setAdviceArticle] = useState([]);

  const getAdviceAxios = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/feed/advice",
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
    })
      .then((res) => {
        console.log(res.data.responseData);
        setAdviceArticle(res.data.responseData.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAdviceAxios();
  }, []);

  const goToAdviceDetail = (id) => {
    console.log(id);
    navigate("detail/" + id, {
      state: {
        id: id,
      },
    });
  };

  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("create");
  };
  const goToDetail = () => {
    navigate("detail");
  };
  console.log("어드바이스",adviceArticle)
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
        {adviceArticle.map((el, idx) => {
          return (
            <EachBox key={idx} onClick={() => goToAdviceDetail(el.id)}>
              <img src={el.photo.imageUrl} alt="" />

              <CommentContainer>
                <VscHeart size="30" />
                <VscComment size="30" />
                <p>{ el.time }</p>
               
              </CommentContainer>
            </EachBox>
          );
        })}
      </HunsuImages>
    </div>
  );
};

export default Advice;

import "./ootd.styles";
import { useNavigate } from "react-router-dom";
import {
  OotdCategory,
  OotdTopBar,
  FilterContainer,
  OotdList,
  Container,
  TopDiv,
  CommentContainer,
  UpperCommentContainer,
  UpperupperCommentContainer,
} from "./ootd.styles";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import { ReactComponent as Comment } from "../../assets/comment.svg";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../store/user/user.selector';

import axios from 'axios'

import { useEffect, useState } from "react";
// import {
// 	LogoContainer,
// } from "./navigation.styles"


const Ootd = () => {
  const navigate = useNavigate();
  const Token = useSelector(selectUser)

  const goToOotdDetail = () => {
    navigate("detail");
  };

  const [ootdArticle, setOotdArticle] = useState([])
  const getOotdAxios = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/feed/ootd",
      headers: {
        Authorization: `Bearer ${Token.token}`,
      }
    })
      .then((res) => {
        console.log(res.data.responseData)
        setOotdArticle(res.data.responseData)
      })
      .catch((err) => {
      console.log(err)
    })
  }
  
  useEffect(() => {
    getOotdAxios()
  },[])

  return (
    <TopDiv>
      <OotdTopBar>
        <OotdCategory>
          <h3>최신</h3>
          <h3>인기</h3>
          <h3>팔로잉</h3>
        </OotdCategory>
        <FilterContainer>
          <Filter />
        </FilterContainer>
      </OotdTopBar>

      <OotdList>
        {ootdArticle.map((el, idx) => {
          return (
            <Container key={idx} onClick={goToOotdDetail}>
              <img src={el} alt="" />
              <UpperupperCommentContainer>
                <UpperCommentContainer>
                  <CommentContainer>
                    <Comment />
                  </CommentContainer>
                  <p>182</p>
                </UpperCommentContainer>
                <p>11h</p>
              </UpperupperCommentContainer>
            </Container>
          );
        })}
      </OotdList>
    </TopDiv>
  );
};

export default Ootd;

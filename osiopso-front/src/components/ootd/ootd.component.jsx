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

import axios from 'axios'
import { useState } from "react";
// import {
// 	LogoContainer,
// } from "./navigation.styles"

const List = [
  "https://i.pinimg.com/736x/f7/d3/2b/f7d32b1070ec2173e0eca9e245216678.jpg",
  "https://mblogthumb-phinf.pstatic.net/MjAxNjEyMjJfMjEx/MDAxNDgyMzc2NTU3NjQx.Bt9_yFd9tb3bZ8vePigNAcepgORjS1Wbk87AuwDTNOkg.2slObsDp-dLKz_KaNP_m_vfzVXO3r6FJNyGGZKSCcFUg.JPEG.farfetch_korea/OOTD_%EC%82%AC%EC%A7%84_%EC%9E%98_%EC%B0%8D%EB%8A%94_%EB%B2%95_%289%29.jpg?type=w800",
  "https://mblogthumb-phinf.pstatic.net/MjAxNjEyMjBfMjky/MDAxNDgyMjE5NzM3MzE1.I11ORNBl3ZgpXQTsSuoVi8m3z1wcIGYflGp14Kn-9Gkg.AsVNjf2QgW-jx74n9S1sUV5ohHCUPlL4mVdVUYuZu4Ug.JPEG.farfetch_korea/OOTD_%EC%82%AC%EC%A7%84_%EC%9E%98_%EC%B0%8D%EB%8A%94_%EB%B2%95_%281%29.jpg?type=w800",
  "https://aconstudio.com/file_data/aconstudio1/gallery/2021/10/13/597034e24a7c471bb7077300366aef53.jpg",
  "https://aconstudio.com/file_data/aconstudio1/gallery/2021/09/29/59143d1f714ec3989c14fd3e3b21e410.jpg",
  "https://aconstudio.com/file_data/aconstudio1/gallery/2021/04/26/0ce7023ac24420ffb7b32e15af630671.jpg",
];

const Ootd = () => {
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("detail");
  };

  const [ootdArticle, setOotdArticle] = useState([])

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
        {List.map((el, idx) => {
          return (
            <Container key={idx} onClick={goToCheckoutHandler}>
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

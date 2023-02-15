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
import Modal from '../modal/modal.component'

import { useEffect, useState } from "react";
import { useBodyScrollLock } from "../profile-closet/profile-closet.component";

const defaultOotdForm = {
  content: '',
  imageUrl: '',
  tags: []
}

const Ootd = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock()
  const [ootdFormData, setOotdFormData] = useState(defaultOotdForm)



  const showModal = ()=> {
    window.scrollTo(0,0);
    setModalOpen(true);
    lockScroll();
  }


  const navigate = useNavigate();
  const Token = useSelector(selectUser)

  const goToOotdDetail = (id) => {
    console.log(id)
    navigate("ootd/detail/" + id, {
      state: {
        id:id
      }
    });
  };

  const [ootdArticle, setOotdArticle] = useState([])
  const getOotdAxios = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/feed/ootd",
      headers: {
        Authorization: `Bearer ${Token.token}`,
      }
    })
      .then((res) => {
        console.log(res.data.responseData)
        setOotdArticle(res.data.responseData.reverse())
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
          <Filter onClick={showModal}/>
        </FilterContainer>
      </OotdTopBar>

      <OotdList>
        {ootdArticle.map((el, idx) => {
          return (
            <Container key={idx} onClick={()=>goToOotdDetail(el.id)}>
              <img src={el.photo.imageUrl} alt="" />
              <UpperupperCommentContainer>
                <UpperCommentContainer>
                  <CommentContainer>
                    <Comment />
                  </CommentContainer>
                  <p>{ el.commentCnt}</p>
                </UpperCommentContainer>
                <p>{ el.time }</p>
              </UpperupperCommentContainer>
            </Container>
          );
        })}
      </OotdList>
      {
        modalOpen && <Modal page={ 2 } setModalOpen={setModalOpen} openScroll={openScroll} ootdFormData={ootdFormData} setOotdFormData={setOotdFormData} />
      }
    </TopDiv>
  );
};

export default Ootd;

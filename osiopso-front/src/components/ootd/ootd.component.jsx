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

import { RiFilter2Fill } from "react-icons/ri";
import { VscComment } from "react-icons/vsc";

import { useSelector } from 'react-redux';
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
      url: `${process.env.REACT_APP_AXIOS_URL}feed/ootd`,
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
          <div>최신</div>
          <div>인기</div>
          <div>팔로잉</div>
        </OotdCategory>
        <FilterContainer>
          <RiFilter2Fill onClick={showModal} color='#7272ba'/>
        </FilterContainer>
      </OotdTopBar>

      <OotdList>
        {ootdArticle.map((el, idx) => {
          return (
            <Container key={idx} onClick={()=>goToOotdDetail(el.id)}>
              <img src={el.imageUrl} alt="" />
              <UpperupperCommentContainer>
                <p>{ el.time }</p>
                <UpperCommentContainer>
                  <CommentContainer>
                    <VscComment size="13" />
                  </CommentContainer>
                  <p>{ el.commentCnt}</p>
                </UpperCommentContainer>
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

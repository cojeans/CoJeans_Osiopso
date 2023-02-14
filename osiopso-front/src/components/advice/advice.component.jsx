import {
  AdvicecContainer, 
  AdviceItemBox,
  ContentBox,
  ImageContainer,

  HunsuImages,
  TopTag,
  Container,
  UpperupperCommentContainer,
  EachIcon,
  CommentContainer,
  EachBox,
  ThumbBox,
  TimeBox,
} from "./advice.styles";
import { TextToLeft } from "../../routes/home/home.styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as Comment } from "../../assets/comment.svg";
import { selectUser } from "../../store/user/user.selector";
import { FiThumbsUp,  FiThumbsDown, FiAlertTriangle, FiTrash2  } from "react-icons/fi";
import { VscTrash, VscHeart, VscComment, VscWarning } from "react-icons/vsc";


import axios from "axios";
import Modal from '../modal/modal.component'

import { Fragment, useEffect, useState } from "react";
import { useBodyScrollLock } from "../profile-closet/profile-closet.component";
import AdviectComment from "../advice-comment/advice-comment.component";

const defaultAdviceForm = {
  content:'',
  imageUrl:'',
  tags:[]
}

const Advice = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {lockScroll, openScroll } = useBodyScrollLock()
  const [adviceFormData, setAdviceFormData] = useState(defaultAdviceForm)

  const Token = useSelector(selectUser);

  const [adviceArticle, setAdviceArticle] = useState([]);

  const showModal = ()=>{
    window.scrollTo(0,0);
    setModalOpen(true)
    lockScroll();
  }

  const getAdviceAxios = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_AXIOS_URL}feed/advice`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
    })
      .then((res) => {
        console.log(res.data.responseData);
        setAdviceArticle(res.data.responseData);
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
      <Fragment>
      {
          adviceArticle &&
          adviceArticle.map((at) => {
            return (
              <AdvicecContainer onClick={()=>goToAdviceDetail(at.id)}>
                <div className="hori">
                </div>
                <AdviceItemBox>
                  <ContentBox>
                      <div className="title">title:{ at.subject}</div>
                      <div className="content">{ at.content}</div>
                      <div className="comment"><VscComment /><div>{ at.commentCnt}</div></div>
                  </ContentBox>
                    <ImageContainer>
                      <img src={ at.photo.imageUrl} alt="" />
                  </ImageContainer>
                </AdviceItemBox>
            </AdvicecContainer>

            )
          })
          
      }
      </Fragment>
 </div>
  );
};

export default Advice;

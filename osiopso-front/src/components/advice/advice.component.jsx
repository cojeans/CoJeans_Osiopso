import {
  AdvicecContainer, 
  AdviceItemBox,
  ContentBox,
  ImageContainer,

  TopTag,
  // Container,
} from "./advice.styles";
import { TextToLeft } from "../../routes/home/home.styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";

import { VscComment } from "react-icons/vsc";

import axios from "axios";

import { Fragment, useEffect, useState, useRef } from "react";
import { useBodyScrollLock } from "../profile-closet/profile-closet.component";

const defaultAdviceForm = {
  content:'',
  imageUrl:'',
  tags:[]
}

const Advice = () => {
  // const [curTab, setCurTab] = useState('ing')
  const [modalOpen, setModalOpen] = useState(false);
  const {lockScroll, openScroll } = useBodyScrollLock()
  const [adviceFormData, setAdviceFormData] = useState(defaultAdviceForm)
  const [bottom, setBottom] = useState(null);
  const [curPage, setCurPage] = useState(1)
  const bottomObserver = useRef(null);
  
  const Token = useSelector(selectUser);

  const [adviceArticle, setAdviceArticle] = useState([]);
  //페이지가 하단에 닿을때마다 추가 게시글 리스트를 가져옵니다.
  useEffect(() => {
    console.log('끝')
    const lastArr = adviceArticle.at(-1)
    if (lastArr) {
      console.log(lastArr.id)
      const lastId = lastArr.id
      
       axios({
        method: "get",
        url: `${process.env.REACT_APP_AXIOS_URL}feed/advice?idx=${lastId}`,
        headers: {
          Authorization: `Bearer ${Token.token}`,
        },
      })
        .then((res) => res.data.responseData)
         .then((data) => {
           console.log(data)
          //  for (let i=0; i < data.length < i++;){
            setAdviceArticle([...adviceArticle, ...data])
          //  }
         })
        .catch((err) => {
          console.log(err);
        });
    }
  },[curPage])

  useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setCurPage((pre) => pre + 1);
          }
        },
        { threshold: 0.25, rootMargin: "80px" }
      );
      bottomObserver.current = observer;
    }, []);

  
	useEffect(() => {
		const observer = bottomObserver.current;
		if (bottom) {
      observer.observe(bottom);
      
		}
		return () => {
			if (bottom) {
				observer.unobserve(bottom);
			}
		};
	}, [bottom]);

 
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

  return (
    <div>
{/* 
      <TextToLeft>
        <TopTag>
          <div onClick={()=>setCurTab('ing')}  className={curTab === 'ing' ? 'curTab' : ''}>
            
            채택 중
            </div> 
            <div onClick={()=>setCurTab('ed')} className={curTab === 'ed' ?'curTab' : ''}>

              채택완료
              </div>
        </TopTag>
      </TextToLeft> */}
      <Fragment>
      {
          adviceArticle &&
          adviceArticle.map((at) => {
            return (
              <AdvicecContainer onClick={()=>goToAdviceDetail(at.id)}>
                <AdviceItemBox>
                  <ContentBox>
                      <div className="title">{ at.subject}</div>
                      <div className="content">{ at.content}</div>
                      <div className="comment"><VscComment /><div>{ at.commentCnt}</div></div>
                  </ContentBox>
                    <ImageContainer>
                      <img src={ at.photo.imageUrl} alt="" />
                  </ImageContainer>
                </AdviceItemBox>
                <div className="hori">
                </div>
            </AdvicecContainer>

            )
          })
          
        }
        <div ref={setBottom} />
      </Fragment>
 </div>
  );
};

export default Advice;

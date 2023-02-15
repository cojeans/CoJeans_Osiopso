import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router";
import {
	SidebarToggle,
  NavbarContainer,
  LinkContainer,
} from "./side-bar.styles"

import styles from "./side-bar.css"
import { ReactComponent as Category } from '../../assets/category.svg'
import { FiSettings } from "react-icons/fi";
import { resetUser } from "../../store/user/user.reducer";
import { useDispatch } from "react-redux";

// 로그인 상황 가정
// const isLogin = true;
const isLogin = localStorage.getItem('token')
// const navigate = useNavigate();



export const SideBar = () => {
  const [isSideOpen, setIsSideOpen] = useState(false);
  
  useEffect(()=>{
    const handleResize = ()=>{
      if(isSideOpen){
        setIsSideOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSideOpen]);
  
  const dispatch = useDispatch()
  const signOut = () => {
    dispatch(resetUser(''))
    const isToken = localStorage.getItem('token')
    if (isToken) {
      alert("로그아웃되었습니다.")
      // navigate('/')

      localStorage.clear();
    }
}
	return (
    <>
      <FiSettings onClick={() => setIsSideOpen(!isSideOpen)}>
        <span class="material-symbols-outlined">
          {isSideOpen? "toggle_on":"toggle_off"}
        </span>
      </FiSettings>
      <NavbarContainer className={`${isSideOpen ? "nav-open" : "nav-closed"}`}>

        {/* { localStorage.getItem('token') ? (
          <li onClick={signOut}>로그아웃</li>)
          : div
        )} */}
        <ul>
          {/* {!isLogin && <LinkContainer to='/join'>
            회원가입
          </LinkContainer>}

          {!isLogin && <LinkContainer to='/login'>
            로그인
          </LinkContainer>} */}

          {<LinkContainer to='/membershipwithdrawal'>
            회원탈퇴
          </LinkContainer>}
          
          {<LinkContainer onClick={signOut}to='/login'>
            로그아웃
          </LinkContainer>}

          {<LinkContainer to='/changePassword'>
            비밀번호 변경
          </LinkContainer>}

          {<LinkContainer to='/disclosurescope'>
            공개범위 설정
          </LinkContainer>}
          {/* <button onClick={signOut}>토큰삭제</button> */}
        </ul>
      </NavbarContainer>
      
    </>
	)
}

export default SideBar
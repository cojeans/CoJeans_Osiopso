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

// 로그인 상황 가정
// const isLogin = true;
const isLogin = localStorage.getItem('token')
// const navigate = useNavigate();

const signOut = () => {
  const isToken = localStorage.getItem('token')
  if (isToken) {
    alert("로그아웃되었습니다.")
    // navigate('/')

    localStorage.clear();
  }
}

export const SideBar = () => {
  const [isSideOpen, setIsSideOpen] = useState(false);
  
  useEffect(()=>{
    const handleResize = ()=>{
      if(window.innerWidth < 600 && isSideOpen){
        setIsSideOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSideOpen]);

	return (
    <>
      <Category onClick={() => setIsSideOpen(!isSideOpen)}>
        <span class="material-symbols-outlined">
          {isSideOpen? "toggle_on":"toggle_off"}
        </span>
      </Category>
      <NavbarContainer className={`${isSideOpen ? "nav-open" : "nav-closed"}`}>
        <div className="logo">The company</div>


        {/* { localStorage.getItem('token') ? (
          <li onClick={signOut}>로그아웃</li>)
          : div
        )} */}
        <ul>
          <LinkContainer to='/'>
            Home
          </LinkContainer>
          {!isLogin && <LinkContainer to='/join'>
            회원가입
          </LinkContainer>}

          {!isLogin && <LinkContainer to='/login'>
            로그인
          </LinkContainer>}

          {isLogin && <LinkContainer to='/membershipwithdrawal'>
            회원탈퇴
          </LinkContainer>}
          
          {isLogin && <LinkContainer onClick={signOut}to='/login'>
            로그아웃
          </LinkContainer>}

          {isLogin && <LinkContainer to='/changePassword'>
            비밀번호 변경
          </LinkContainer>}

          {isLogin && <LinkContainer to='/disclosurescope'>
            공개범위 설정
          </LinkContainer>}
          <button onClick={signOut}>토큰삭제</button>
        </ul>
      </NavbarContainer>
      
    </>
	)
}

export default SideBar
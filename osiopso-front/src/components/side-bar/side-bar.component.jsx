import React, { useState, useEffect } from "react";

import {
	SidebarToggle,
  NavbarContainer,
  LinkContainer,
} from "./side-bar.styles"

import styles from "./side-bar.css"
import { ReactComponent as Category } from '../../assets/category.svg'

// 로그인 상황 가정
const isLogin = true;

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

          {isLogin && <LinkContainer to='/login'>
            회원탈퇴
          </LinkContainer>}
          
          {isLogin && <LinkContainer to='/login'>
            로그아웃
          </LinkContainer>}

          {isLogin && <LinkContainer to='/login'>
            비밀번호 변경
          </LinkContainer>}

          {isLogin && <LinkContainer to='/login'>
            공개범위 설정
          </LinkContainer>}
        </ul>
      </NavbarContainer>
      
    </>
	)
}

export default SideBar
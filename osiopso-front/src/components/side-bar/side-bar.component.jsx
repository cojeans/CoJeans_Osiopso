import React, { useState, useEffect } from "react";
import { links } from "../../data";
import {
	SidebarToggle,
  NavbarContainer,
  LinkContainer,
} from "./side-bar.styles"

import styles from "./side-bar.css"
import { ReactComponent as Category } from '../../assets/category.svg'

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
          {links.map((link) => (
            <li>
              <LinkContainer to ="/">
                {link.text}

              </LinkContainer>
            </li>
          ))}
        </ul>
      </NavbarContainer>
      
    </>
	)
}

export default SideBar
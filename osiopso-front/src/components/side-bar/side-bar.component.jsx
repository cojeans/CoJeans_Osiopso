import React, {useState} from "react";
import { links } from "../../data";
export const SideBar = () => {
  const [isSideOpen, setIsSideOpen] = useState(false);
	return (
    <>
      <button 
        className="sidebar-toggle"
      >
        <span>toggle_on</span>
        <span>toggle_off</span>
      </button>
      <nav className="nav">
        <div className="logo">The company</div>
        <ul>
          {links.map((link) => {
            <li>
              <a className="links" to="/">{link.text}</a>
            </li>
          })}
        </ul>
      </nav>
    </>
	)
}
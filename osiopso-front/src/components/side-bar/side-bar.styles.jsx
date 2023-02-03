import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const SidebarToggle = styled.button`
position: fixed;
top: 2rem;
right: 3rem;
background: transparent;
border-color: transparent;
color: hsl(205, 78%, 60%);
cursor: pointer;
`

export const NavbarContainer = styled.nav`
width: 310px;
position: fixed;
z-index: -1;
top: 0;
background-color: #f1f1f1;
height: 100%;
overflow-x: hidden;
transition: 0.5s;
padding-top: 60px;
display: flex;
flex-direction: column;
`

// export const LinkContainer = styled.a`
// margin: 0;
// padding: 0;
// box-sizing: border-box;
// display:block;
// font-size: 1.5rem;
// text-transform: capitalize;
// padding: 1rem 1.5rem;
// color: hsl(210, 22%, 49%);
// transition: all 0.3s linear;
// cursor: pointer;

//     &:hover {
//     background: hsl(205, 86%, 81%);

//     }
// `
export const LinkContainer = styled(NavLink)`
margin: 0;
padding: 0;
box-sizing: border-box;
display:block;
font-size: 1.05rem;
text-transform: capitalize;
padding: 1rem 1.5rem;
color: hsl(210, 22%, 49%);
transition: all 0.3s linear;
text-decoration:none;

cursor: pointer;

    &:hover {
    background: hsl(205, 86%, 81%);

    }
`
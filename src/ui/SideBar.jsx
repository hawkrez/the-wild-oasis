import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { NavLink } from "react-router-dom";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.div`
  background-color: var(--color-grey-0);
  padding: 1.2rem 3.8rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  grid-row: 1/-1;
  border-right: 1px solid var(--color-grey-100);
`;

function SideBar() {
  return (
    <StyledSidebar>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <MainNav />
      <Uploader />
    </StyledSidebar>
  );
}

export default SideBar;

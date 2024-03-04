import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserAdd } from "react-icons/hi";

import LogOutBtn from "../features/authentication/LogOutBtn";
import Avatar from "../features/authentication/UserAvatar";
import DarkModeToggler from "./DarkModeToggler";
import ButtonIcon from "./ButtonIcon";

function Header() {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <BtnsBatch>
        <ButtonIcon onClick={() => navigate("/newusers")}>
          <HiOutlineUserAdd />
        </ButtonIcon>
        <DarkModeToggler />
        <LogOutBtn />
      </BtnsBatch>
      <Avatar />
    </StyledHeader>
  );
}

const StyledHeader = styled.h1`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
`;

const BtnsBatch = styled.div`
  display: flex;
  gap: 1rem;
`;

export default Header;

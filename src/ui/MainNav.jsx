import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BiSolidUserAccount } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import { MdOutlineCabin } from "react-icons/md";
import { TbSettingsCode } from "react-icons/tb";
import { LuUserPlus } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Link = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <NavList>
      <Link to="/">
        <MdOutlineSpaceDashboard />
        <p>Dashboard</p>
      </Link>
      <Link to="bookings">
        <GiNotebook />
        <p>Bookings</p>
      </Link>
      <Link to="cabins">
        <MdOutlineCabin />
        <p>Cabins</p>
      </Link>
      <Link to="settings">
        <TbSettingsCode />
        <p>Settings</p>
      </Link>
      <Link to="account">
        <BiSolidUserAccount />
        <p>Account</p>
      </Link>
      <Link to="newUsers">
        <LuUserPlus />
        <p>NewUsers</p>
      </Link>
    </NavList>
  );
}

export default MainNav;

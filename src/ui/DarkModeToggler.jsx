import { BiMoon } from "react-icons/bi";
import { HiOutlineSun } from "react-icons/hi";

import ButtonIcon from "./ButtonIcon";
import { useDarkModeContext } from "../contexts/useDarkModeContext";

export default function DarkModeToggler() {
  const { toggleDarkMode, isDarkMode } = useDarkModeContext();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <BiMoon />}
    </ButtonIcon>
  );
}

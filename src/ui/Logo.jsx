import styled from "styled-components";
import { useDarkModeContext } from "../contexts/useDarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkModeContext();

  const imageSrc = isDarkMode ? "logo-dark.png" : "logo-light.png";

  return (
    <StyledLogo>
      <Img src={imageSrc} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;

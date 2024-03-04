/*eslint react/prop-types:0 */

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

function EmptyPage({ name }) {
  const navigate = useNavigate();

  return (
    <StyledEmptyPage>
      <p>There is no {name || `data`} to show</p>
      <Button onClick={() => navigate(-1)} size="large" variation="danger">
        Back
      </Button>
    </StyledEmptyPage>
  );
}

const StyledEmptyPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bolder;
  color: var(--color-brand-600);
`;

export default EmptyPage;

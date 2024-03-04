/*eslint react/prop-types:0 */

import styled from "styled-components";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function Sort({ options, name }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentlySlelected = searchParams.get(name);

  const handleChange = function (e) {
    searchParams.set(name, e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <StyledRow>
      <label htmlFor={name}>sort by:</label>
      <Select
        options={options}
        handleChange={handleChange}
        $type="white"
        id={name}
        currentlySlelected={currentlySlelected}
      />
    </StyledRow>
  );
}

const StyledRow = styled.div`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

export default Sort;

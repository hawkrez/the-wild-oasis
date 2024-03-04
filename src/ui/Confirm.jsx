/*eslint react/prop-types:0  */

import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

function Confirm({
  message,
  title,
  confirmBtnTitle,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  // onCloseModal: there is no need to define a onCloseModal Fn
  return (
    <StyledConfirmDelete>
      <Heading as="h3">{title}</Heading>
      <p>{message}</p>

      <div>
        <Button
          onClick={onCloseModal}
          variation="secondary"
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
          variation="danger"
          disabled={disabled}
        >
          {confirmBtnTitle || "confirm"}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default Confirm;

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

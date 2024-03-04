import styled from "styled-components";
import Fliter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import { CurPageContext } from "./CurPageContext";
import { useContext } from "react";

function BookmarsFilterAndSort() {
  const { setCurPage } = useContext(CurPageContext);
  return (
    <StyledRow>
      <Sort
        name="sort-bookings-by"
        options={[
          { value: "startDate-desc", label: "date (recent first)" },
          { value: "startDate-asc", label: "date (older first)" },
          {
            value: "totalPrice-desc",
            label: "amount (high first)",
          },
          { value: "totalPrice-asc", label: "amount (low first)" },
        ]}
      />
      <Fliter
        name="checked-status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
        setCurPage={setCurPage}
      />
    </StyledRow>
  );
}

const StyledRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export default BookmarsFilterAndSort;

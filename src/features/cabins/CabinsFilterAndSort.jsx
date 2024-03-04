import styled from "styled-components";
import Fliter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function CabinsFilterAndSort() {
  return (
    <StyledRow>
      <Sort
        name="sort-cabins-by"
        options={[
          { value: "name-asc", label: "name (min to max)" },
          { value: "name-desc", label: "name (max to min)" },
          { value: "maxCapacity-asc", label: "capacity (min to max)" },
          { value: "maxCapacity-desc", label: "capacity (max to min)" },
          { value: "regularPrice-asc", label: "price (min to max)" },
          { value: "regularPrice-desc", label: "price (max to min)" },
          { value: "discount-asc", label: "discount (min to max)" },
          { value: "discount-desc", label: "discount (max to min)" },
        ]}
      />
      <Fliter
        name="discount-status"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With discount" },
          { value: "without-discount", label: "Without discount" },
        ]}
      />
    </StyledRow>
  );
}

const StyledRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export default CabinsFilterAndSort;

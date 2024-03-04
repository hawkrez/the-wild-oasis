/*eslint react/prop-types:0 */

import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

import { bookmarksPerPage } from "../utils/constants";
import { useContext } from "react";
import { CurPageContext } from "../features/bookings/CurPageContext";

function Pagination({ count }) {
  const numPages = Math.ceil(count / bookmarksPerPage);
  const [searchParams, SetSearchParams] = useSearchParams();

  const { curPage, setCurPage } = useContext(CurPageContext);

  const handleDecrease = function () {
    if (curPage < 2) return;
    searchParams.set("pagination", curPage - 1);
    SetSearchParams(searchParams);
    setCurPage((curPage) => curPage - 1);
  };
  const handleIncrease = function () {
    if (curPage === numPages) return;
    searchParams.set("pagination", curPage + 1);
    SetSearchParams(searchParams);
    setCurPage((curPage) => curPage + 1);
  };

  if (numPages < 2) return null;
  return (
    <StyledPagination>
      <P>
        page <span>{curPage}</span> (Showing resault{" "}
        <span>{(curPage - 1) * bookmarksPerPage + 1}</span> to resault{" "}
        <span>{numPages === curPage ? count : curPage * bookmarksPerPage}</span>{" "}
        of <span>{count}</span> resaults)
      </P>
      <Buttons>
        <PaginationButton onClick={handleDecrease} disabled={curPage < 2}>
          <HiChevronLeft />
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={handleIncrease}
          disabled={curPage === numPages}
        >
          Next
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.disabled ? "var(--color-grey-400)" : " inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  min-width: 11rem;
  margin: 0 auto;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

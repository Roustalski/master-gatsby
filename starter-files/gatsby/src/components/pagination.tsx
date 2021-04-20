import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

export type PaginationProps = {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  skip: number;
  base: string;
};

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

const Pagination = ({
  currentPage,
  pageSize,
  totalCount,
  base,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log('this is confusing',totalPages, pageSize);
  const prevPage = currentPage - 1;
  const nextPage = (currentPage || 0) + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`/${base}/${prevPage}`}>
        ← Previous
      </Link>
      {Array.from({ length: totalPages }).map((_, idx) => (
        <Link
          key={idx}
          className={currentPage === 1 && idx === 0 ? "current" : ""}
          to={`/${base}/${idx > 0 ? idx + 1 : ""}`}
        >
          {idx + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`/${base}/${nextPage}`}>
        Next →
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;

import React from "react";
import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types"; //ES6

const PaginationUsers = ({
  itemsCount,
  pageSize,
  onPageChange,
  activePage,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  const paginationBasic = (
    <div>
      <Pagination size="lg">{items}</Pagination>
      <br />
    </div>
  );

  return paginationBasic;
};

Pagination.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  activePage: PropTypes.number,
};
export default PaginationUsers;

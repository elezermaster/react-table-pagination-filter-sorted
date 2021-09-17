import React from "react";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";

const Bookmark = ({status, ...rest}) => {
  return status ? <FaBookmark /> : <FaRegBookmark />;
};

export default Bookmark;

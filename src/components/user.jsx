import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import Button from "react-bootstrap/Button";

const User = ({user, index, onDelete, onToggleBookmark}) => {
  console.log("user.qualities",user.qualities)
  return (
    <tr key={user._id}>
      <td>{index}</td>
      <td>{user.name}</td>
      {/*<td>{listQualities(user.qualities)}</td> */}
      <td>
        <Qualitie qualities={Object.assign({}, user.qualities)} />
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <Button variant="light" onClick={() => onToggleBookmark(user._id)}>
          {/* {user.favorites?<FaBookmark/>:<FaRegBookmark/>} */}
          <Bookmark status={user.favorites} />
        </Button>
      </td>
      <td>
        {
          <Button variant="warning" onClick={() => onDelete(user._id)}>
            Delete
          </Button>
        }
      </td>
    </tr>
  );
};

export default User;

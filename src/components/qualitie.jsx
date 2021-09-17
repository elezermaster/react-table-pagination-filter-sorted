import React from "react";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types"; //ES6

const Qualitie = ({qualities}) => {
  const usersQualities = Object.keys(qualities).map((q) => {
    return (
      <Badge
        key={qualities[q]._id}
        bg={qualities[q].color}
        className="rounded-pill"
        color="blue"
        style={{marginLeft: "5px"}}
      >
        {qualities[q].name}
      </Badge>
    );
  });
  return usersQualities;
};

Qualitie.propTypes = {
  qualities: PropTypes.object.isRequired,
};
export default Qualitie;

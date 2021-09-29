import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import PropTypes from 'prop-types'; // ES6

const GroupList = ({items,valueProperty,activeProperty,onItemSelect,selected}) => {
    const groupListItems = Object.keys(items).map((item,index) => {
        let isSelected = ''
        if (selected) {
            isSelected = items[item].name === selected.name ? 'active' : ''
        }
        return (
            <ListGroup.Item
                key={index}//items[item][valueProperty]
                as="li"
                onClick={() => onItemSelect(items[item])}
                className={isSelected}
                >{items[item][activeProperty]}</ListGroup.Item>)
    })
    return (
        <ListGroup as="ul">
            {groupListItems}
        </ListGroup>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    activeProperty: "name",
}
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    activeProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selected: PropTypes.object,
}
export default GroupList;

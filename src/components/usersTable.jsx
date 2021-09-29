import React from 'react';
import PropTypes from 'prop-types'
import User from './user'
import Table from 'react-bootstrap/Table';
import TableHeader from './tableHeader'

const UsersTable = ({userCrop, startIndex, onDelete, onToggleBookmark, onSort, currentSort}) => {
    const columns = {
        index: {},
        name: {iterator: "name", name: "Name"},
        qualities: {iterator: "qualities", name: "Качества"},
        profession: {iterator: "profession.name", name: "Профессия"},
        completedMeetings: {iterator: "completedMeetings", name: "Встретился"},
        rate: {iterator: "rate", name: "Оценка"},
        bookmark: {iterator: "bookmark", name: "Избранное"},
        delete: {},
    }
    const listUsers = userCrop && userCrop.map((user,index) => {
        return (
            <User
                key={user._id}
                user={user}
                index={startIndex + index + 1}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
                />
        )
    })
    return (
        <Table striped bordered hover>
            <TableHeader {...{onSort, currentSort, columns}}/>
        <tbody>
        {listUsers}
        </tbody>
    </Table>
    );
};

UsersTable.propTypes = {
    userCrop: PropTypes.array.isRequired,
    startIndex: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired,
}
export default UsersTable;

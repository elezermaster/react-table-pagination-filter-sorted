import React,{useState,useEffect} from 'react';
import UsersTable from './usersTable.jsx'
import Pagination from '../components/pagination'
import {paginate} from '../utils/paginate'
import PropTypes from 'prop-types'; // ES6
import GroupList from '../components/groupList'
import Button from 'react-bootstrap/Button'
import api from '../API'
import SearchStatus from './searchStatus'
import lodash from 'lodash'

const Users = ({onDelete,onToggleBookmark,users}) => {
    console.log('users',users)
  const pageSize = 4
  const [activePage, setActivePage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProfession, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({iterator: "name", order: "asc"})

    const handlePageChange = (pageIndex) => {
        console.log('pageIndx', pageIndex)
        setActivePage(pageIndex)
    }
    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
        console.log('params',item)
    }
    const clearFilter = () => {
        setSelectedProf()
    }
    useEffect(() => {
    //вызывается в случаях когда:
    //1.монтируется
    api.professions.fetchAllProfessions()
        .then(data => setProfession(Object.assign(data,{allPofession: {name: "all professions"} })))
    //2.изменяется
    console.log('change')
    //3.удаляется
    return () => { //вызывается при удалении компонента
        console.log('unmount')
    }
    },[])//параметер за которым необходимо наблюдать
    useEffect(() => {
        console.log('selectedProfession',selectedProfession)
        setActivePage(1)
    },[selectedProfession])
    const filteredUsersByProf = selectedProfession && selectedProfession._id
        ? users.filter((user) => user.profession.name === selectedProfession.name)
        : users
    const count = filteredUsersByProf.length
    const usersSorted = lodash.orderBy(filteredUsersByProf, [sortBy.iterator], [sortBy.order])
    const userCrop = paginate(usersSorted, activePage, pageSize)
    const startIndex = (activePage - 1) * pageSize

    return (
        <React.Fragment>
            <div className="d-flex flex-column p-3">
            <div className="d-flex flex-direction-row flex-wrap-wrap w-100">
                <SearchStatus length={count}/>
            </div>
            <div className="d-flex flex-direction-row flex-wrap-wrap w-100">
            <div className="d-flex flex-column flex-shrink-3 p-3">
            {professions && // if professions exists:
            <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
                selected={selectedProfession}
                valueProperty="_id"
                activeProperty="name"
                />
            }
            <div className="flex-shrink-2">
            <Button
                size="lg"
                className="mt-2"
                variant="secondary"
                value="clear"
                type="reset"
                onClick={clearFilter}
            >Clear</Button>
            </div>
            </div>
            {count &&
                (<div className="d-flex flex-column p-3">
                <UsersTable
                    userCrop={userCrop}
                    startIndex={startIndex}
                    onDelete={onDelete}
                    onToggleBookmark={onToggleBookmark}
                    onSort={setSortBy}
                    currentSort={sortBy}
                />
                <div className="d-flex flex-direction-row justify-content-center">
                <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange} activePage={activePage}/>
                </div>
                </div>)
            }
            </div>
            </div>
        </React.Fragment>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
}

export default Users

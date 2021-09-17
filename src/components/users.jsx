import React,{useState,useEffect} from 'react';
import User from './user.jsx'
import Table from 'react-bootstrap/Table';
import Pagination from '../components/pagination'
import {paginate} from '../utils/paginate'
import PropTypes from 'prop-types'; // ES6
import GroupList from '../components/groupList'
import Button from 'react-bootstrap/Button'
import api from '../API'
import SearchStatus from './searchStatus'

const Users = ({onDelete,onToggleBookmark,users}) => {
    console.log('users',users)
  const pageSize = 4
  const [activePage, setActivePage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProfession, setSelectedProf] = useState()

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
    console.log('filteredUsersByProf',filteredUsersByProf)
    const userCrop = paginate(filteredUsersByProf, activePage, pageSize)
    console.log('userCrop', userCrop)
    const startIndex = (activePage - 1) * pageSize
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
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Qualities</th>
                        <th>Profession</th>
                        <th>Meetings</th>
                        <th>Rate</th>
                        <th>Favorites</th>
                        <td>{/*delete button*/}</td>
                        </tr>
                    </thead>
                    <tbody>
                    {listUsers}
                    </tbody>
                </Table>
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

import React,{useState,useEffect} from 'react';
import Users from './components/users'
import api from './API'

function App() {
  const [users, setUsers] = useState()
  useEffect(() => {
    api.users.fetchAll()
        .then(data => {
          setUsers(data)
          console.log("data",data)
        })
    },[])
  const handleDelete = (userId) => {
      const newUsers = users.filter(user => user._id !== userId)
      setUsers(newUsers)
  }
  const handleToggleBookMark = (userId) => {
      const newStateUsers = [...users]
      const index = newStateUsers.findIndex(user => user._id === userId)
      newStateUsers[index].bookmark = !newStateUsers[index].bookmark
      setUsers(newStateUsers)
  }
  return (
    <div className="App">
      {users &&
            <Users
            onDelete={handleDelete}
            onToggleBookmark={handleToggleBookMark}
            users={users}
          />
      }
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import User from './User';
import { getUsers, updateUser, addUser } from '../ApiService';

function UserList({ setIdToShow, setUserPosts, showAddForm, setShowAddForm, todos }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastClickedUserId, setLastClickedUserId] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const updateExistingUser = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const deleteExistingUser = (deleteUserId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== deleteUserId));
  };

  const handleNewUserName = (event) => {
    const { name, value } = event.target;
    setNewUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleNewUserEmail = (event) => {
    const { email, value } = event.target;
    setNewUser(prevUser => ({ ...prevUser, [email]: value }));
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      const addedUser = await addUser(newUser);
      setUsers(prevUsers => [...prevUsers, addedUser]);
      setNewUser({ name: '', email: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div style={{ border: `1px solid black` }}>
      <input onChange={handleSearch}></input>
      <button onClick={() => setShowAddForm(true)}>Add User</button>
      {users.filter((user) => {
        const { name, email } = user;
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }).map((user) => (
        <div style={{ margin: '10px' }}>
        <User
          key={user.id}
          user={user}
          updateUser={updateExistingUser}
          deleteUser={deleteExistingUser}
          setIdToShow={() => setIdToShow(user.id)}
          lastClickedUserId={lastClickedUserId}
          setLastClickedUserId={setLastClickedUserId}
          todos={todos.filter((todo) => todo.userId === user.id)}
        />
        </div>
      ))}
    </div>
  );
}

export default UserList;
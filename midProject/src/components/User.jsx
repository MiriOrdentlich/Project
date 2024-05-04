import React, { useState, useEffect } from 'react';
import OtherData from './OtherData';
import { deleteUser, updateUser } from '../ApiService';


export default function User(props) {
  const [isOver, setIsOver] = useState(false);
  const [user, setUser] = useState(props.user);
  const [isIdClicked, setIsIdClicked] = useState(false);
  const { todos, posts } = props;

  const hasUncompletedTasks = todos && todos.some((todo) => !todo.completed);
  const borderColor = hasUncompletedTasks ? 'red' : 'green';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      address: { ...prevUser.address, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(user.id, user);
      props.updateUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    const resp = await deleteUser(user.id);
    console.log(resp);
    props.deleteUser(user.id);
  };

  const handleIdOnClick = async () => {
    setIsIdClicked((prev) => !prev);
    props.setIdToShow((prev) => user.id);
    props.setLastClickedUserId(user.id);
    console.log(todos);
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <div style={{ border: `1px solid ${borderColor}`, padding: '10px', backgroundColor: props.lastClickedUserId === user.id ? 'orange' : 'white' }}>
        <span onClick={handleIdOnClick} style={{ textDecoration: 'underline' }}>ID:</span>
        <span>{user.id}</span>
        <br />
        <span style={{ textDecoration: 'underline' }}>Name:</span>
        <input name="name" value={user.name} onChange={handleChange} />
        <br />
        <span style={{ textDecoration: 'underline' }}>Email:</span>
        <input name="email" value={user.email} onChange={handleChange} />
        <br />
        <button type="button" onMouseOver={() => setIsOver(true)} onClick={() => setIsOver(false)}>
          Other Data
        </button>
        {isOver && <OtherData user={user} handleAddressChange={handleAddressChange} />}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          <button type="submit">Update</button>
        </div>
        <button onClick={handleDelete} type="button">Delete</button>
      </div>
    </form>
  );
}
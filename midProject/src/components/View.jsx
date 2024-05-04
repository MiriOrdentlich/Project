import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import TodoList from './TodoList';
import PostList from './PostList';
import { getTodos, getPosts ,getUsers, updateUser, addUser} from '../ApiService';

export default function View() {
  const [idToShow, setIdToShow] = useState(null);
  const [userTodos, setUserTodos] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todosData, postsData] = await Promise.all([getTodos(), getPosts()]);
        setTodos(todosData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateUserData = (userId) => {
    const selectedUserTodos = todos.filter(todo => todo.userId === userId);
    const selectedUserPosts = posts.filter(post => post.userId === userId);
    setUserTodos(selectedUserTodos);
    setUserPosts(selectedUserPosts);
  };

  const updateUserPosts = (newPost) => {
    setPosts(prevPosts => [...prevPosts, newPost]);
    setUserPosts(prevPosts => [...prevPosts, newPost]);
  };

  const updateTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );

    setUserTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const updateTodos = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setUserTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleNewUserName = (event) => {
    const { name, value } = event.target;
    setNewUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleNewUserEmail = (event) => {
    const { email, value } = event.target;
    setNewUser(prevUser => ({ ...prevUser, email: value }));
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      const addedUser = await addUser(newUser);
      // setUsers(prevUsers => [...prevUsers, addedUser]);
      // setNewUser({ name: '', email: '' });
      setIdToShow(addedUser.id);
      updateUserData(addedUser.id);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div>
        <UserList
          setIdToShow={(userId) => {
            console.log(userId);
            setIdToShow(userId);
            updateUserData(userId);
          }}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          handleAddUser={handleAddUser}
          todos={todos}
        />
      </div>
      <div>
        {showAddForm ? (
          <form onSubmit={handleAddUser}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleNewUserName}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleNewUserEmail}
              required
            />
            <button type="submit">Add User</button>
            <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
          </form>
        ) : idToShow ? (
          <>
            <TodoList
              setTodos={setTodos}
              todos={userTodos}
              updateTodo={updateTodo}
              updateTodos={updateTodos}
              userId={idToShow}
            />
            <PostList posts={userPosts} userId={idToShow} setPosts={updateUserPosts} />
          </>
        ) : null}
      </div>
    </div>
  );
}
//appservise
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const usersUrl = "https://jsonplaceholder.typicode.com/users";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

//USERS
// GET ALL USERS
const getUsers = async () => {
  const { data } = await axios.get(usersUrl);
  return data;
  
};

// GET USERS EMAILS
const getEmails = async () => {
  const { data } = await axios.get(usersUrl);
  const emails = data.map(user => user.email);
  return emails;
};

// GET USER BY ID
const getUserByid = async (id) => {
  const { data } = await axios.get(`${usersUrl}/${id}`);
  return data;
};

// POST USER
const createUser = async (user) => {
  const { data } = await axios.post(usersUrl, user);
  return data;
};

// PUT USER
const updateUser = async (id, user) => {
  const { data } = await axios.put(`${usersUrl}/${id}`, user);
  console.log(data)
  return data;
  
};

// DELETE USER
const deleteUser = async (id) => {
  try {
    // Delete user
    await axios.delete(`${usersUrl}/${id}`);

    // Delete user's todos
    const todosResponse = await axios.get(`${todosUrl}?userId=${id}`);
    const userTodos = todosResponse.data;
    await Promise.all(userTodos.map(todo => axios.delete(`${todosUrl}/${todo.id}`)));

    // Delete user's posts
    const postsResponse = await axios.get(`${postsUrl}?userId=${id}`);
    const userPosts = postsResponse.data;
    await Promise.all(userPosts.map(post => axios.delete(`${postsUrl}/${post.id}`)));

    console.log("User and associated todos and posts deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const addUser = async (user) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};


//TODO
export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};
export const getTodosByUserId = async (userId) => {
  const { data } = await axios.get(todosUrl, {
    params: {
      userId: userId
    }
  });
  console.log(data)
  return data;
};
export const addTodo = async (todo) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', todo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

//POSTS
export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
// ...


export const addPost = async (post) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
    return response.data;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
  
};
export { createUser, deleteUser, getEmails, getUserByid, getUsers, updateUser ,addUser};
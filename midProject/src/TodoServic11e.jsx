// Service.jsx
import axios from "axios";


const todosUrl = "https://jsonplaceholder.typicode.com/todos";



// GET ALL TODOS
const getTodos = async () => {
  const { data } = await axios.get(todosUrl);
  return data;
};



// GET  BY ID

const getTodosByUserId = async (userId) => {
  const { data } = await axios.get(todosUrl, {
    params: {
      userId: userId
    }
  });
  console.log(data)
  return data;
};





export {  getTodos,getTodosByUserId};
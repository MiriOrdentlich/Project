//TodoList
import Todo from './Todo';
import React, { useState } from 'react';
import { addTodo } from '../ApiService';
 

function TodoList(props) {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState(false);
  const [newToDo, setNewToDo] = useState({ title: '', completed: false });
  const setToDo = (id) => {
    props.setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };
  const handleAddTodo = async (event) => {
    event.preventDefault();
    try {
      const addedTodo = await addTodo({ ...newToDo, userId: props.userId });
      props.updateTodos(addedTodo);
      setNewToDo({ title: title, completed: false });
      setIsAdd(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // const handleNewToDotitle=(event)=>{
  //   const { title, value } = event.target;
  //   setTitle(title);
  // }
  const handleNewTodoChange = (event) => {
    const { name, value } = event.target;
    setNewToDo(prevTodo => ({ ...prevTodo, [name]: value }));
  };
  return (
    <div>
      <h1>Todos - User</h1>
      <button onClick={()=>{setIsAdd(true)}}>Add</button>
      <div style={{ border: `1px solid black` }}>
      {!isAdd && props.todos && props.todos.map((todo) => (
        <div style={{ margin: '10px' }}>
        <Todo key={todo.id} setToDo={props.updateTodo} ToDo={todo}></Todo>
        </div>
      ))}
      {isAdd && 
      <form onSubmit={handleAddTodo}>
        <span>Title:</span>
      <input
        type="text"
        name="title"
        onChange={handleNewTodoChange}
        required
      />
      <button type="submit">Add</button>
      <button type="button"  onClick={()=>{setIsAdd(false)}}>Cancel</button>
    </form>
      }
    </div>
    </div>

  );
}

export default TodoList;
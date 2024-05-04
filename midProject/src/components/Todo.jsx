import React, { useState } from 'react';


export default function Todo(props) {
    const [isChecked, setIsChecked] = useState(props.ToDo.completed);
    const handleClick = (event) => {
        // const { completed, value } = event.target;
        props.setToDo(props.ToDo.id);
      };
    return (
    <div style={{ border: `1px solid black`  ,padding: '10px'}}>
         <p>Title: {props.ToDo.title}</p>
         <p>Completed: {props.ToDo.completed ? 'Yes' : 'No'}</p>
        {!props.ToDo.completed&&<button onClick={handleClick}>Mark Completed</button>}
    </div>
  )
}

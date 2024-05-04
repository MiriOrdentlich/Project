import React, { useState } from 'react';


export default function Post(props) {
    return (
    <div style={{ border: `1px solid black`,padding: '10px' }}>
         <h3>{props.post.title}</h3>
          <p>{props.post.body}</p>
    </div>
  )
}

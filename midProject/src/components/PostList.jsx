import React, { useState } from 'react';
import { addPost } from '../ApiService';
import Post from './Post';


function PostList({ posts, userId, setPosts }) {
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [isAdd, setIsAdd] = useState(false);

  const handleNewPostChange = (event) => {
    const { name, value } = event.target;
    setNewPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handleAddPost = async (event) => {
    event.preventDefault();
    try {
      const addedPost = await addPost({ ...newPost, userId });
      setPosts(addedPost);
      setNewPost({ title: '', body: '' });
      setIsAdd(false);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div>
      <h1>Posts - User {userId}</h1>
      <button onClick={()=>{setIsAdd(true)}}>Add</button>
      <div style={{ border: `1px solid black` }}>
      {!isAdd && posts.map((post) => (
      <div style={{ margin: '10px' }}>
        <Post key={post.id} post={post}></Post>
      </div>
      ))}
    {isAdd &&
    <div>
      <h2>New Post</h2>
      <form onSubmit={handleAddPost}>
        <input type="text" name="title" placeholder="Title" value={newPost.title} onChange={handleNewPostChange} />
        <textarea name="body" placeholder="Body" value={newPost.body} onChange={handleNewPostChange} />
        <button type="submit">Add Post</button>
      </form>
      </div>}
    </div>
    </div>

  );
}

export default PostList;
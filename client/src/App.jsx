import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleNewPostCreated = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className="app">
      <h1>Book Reading Tracking App</h1>
      <PostForm onPostCreation={handleNewPostCreated} />
      <PostList posts={posts} />

    </div>
  );
};

export default App;

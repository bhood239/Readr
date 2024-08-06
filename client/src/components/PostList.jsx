import React from 'react';
// import PropTypes from 'prop-types';
import Post from './Post';
import { useAllPosts } from '../helpers/hooks/apiData/usePostData';

const PostList = () => {
  const {posts, loading, error} = useAllPosts();

  if (loading) {
    return <div> Posts Loading...</div>;
  }

  if (error) {
    return <div>Error while loading posts: {error.message}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div> No posts to show at this time.</div>;
  }

  // Sort posts by creation date (assuming each post has a `created_at` field)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="post-list">
      {sortedPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};


export default PostList;
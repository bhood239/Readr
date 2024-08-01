import React from 'react';
import PropTypes from 'prop-types';
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
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      }).isRequired,
      review: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostList;
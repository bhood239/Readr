
import React from 'react';
import PropTypes from 'prop-types';


const Post = ({ post }) => {
  return (
    <div className="post">
      <h3>Post ID: {post.id}</h3>
      <h4>Posted By: {post.user.name}</h4>
      <h5>Book: {post.book.title} by {post.book.author}</h5>
      <p>Review: {post.review}</p>
    </div>
  );
};



Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
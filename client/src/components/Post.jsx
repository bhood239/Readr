import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useBookById } from '../helpers/hooks/useBookData';

const Post = ({ post }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const { book, loading, error } = useBookById(post.bookId); // Assuming post.bookId exists

  useEffect(() => {
    if (book) {
      setBookDetails(book);
    }
  }, [book]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching book details.</p>;

  return (
    <div className="post">
      <h3>Post ID: {post.id}</h3>
      <h4>Posted By: {post.user.name}</h4>
      <h5>Book: {bookDetails?.title} by {bookDetails?.author}</h5>
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
    bookId: PropTypes.number.isRequired, // Assuming bookId is used instead of book details
    review: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;

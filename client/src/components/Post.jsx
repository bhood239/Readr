
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useBookById } from '../helpers/hooks/useBookData';
import CustomRating from './CustomRating';
import './PostList.scss';
import PostForm from './PostForm';
const Post = ({ post, currentUser, onEdit, onDelete }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { book, loading, error } = useBookById(post.book_id); // Corrected to post.book_id


  useEffect(() => {
    if (book) {
      // console.log('Setting book details:', book);
      setBookDetails(book);
    }
  }, [book]);

  // console.log('Post object:', post);

  if (!post.book_id) return <p>Invalid Book ID</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching book details.</p>;
  if (!bookDetails) {
    // console.log('Book data is null');
    return <p>No book data available</p>;
  }
  if (editMode) {
    return (
      <PostForm
        currentUser={currentUser.id}
        postFormBookId={post.book_id}
        onPostCreation={bookDetails}
        setPostFormSelected={setEditMode}
      />
    );
  }

  //if editMode is false, then render the create form, if editMode is true, render edit
  return (
    <div className="post row">
        <div class="col-auto">
      <img src={bookDetails.cover} alt={`Cover of ${bookDetails.title}`} style={{ maxWidth: '128px' }}/>
      </div>
      <div class="col">

      <h4>Book: {bookDetails.title} </h4>
      <h4>Author: {bookDetails.author}</h4>


      <h5>Reviewed By: {post.user.name}</h5>
      <CustomRating totalStars={5} rating={post.rating} />
      <h6>Comments: {post.review}</h6>
      {post.user_id === currentUser.id && (
          <div className="post-actions">
            <button className="btn btn-warning me-2" onClick={() => setEditMode(true)}>Edit</button>
            <button className="btn btn-danger" onClick={() => onDelete(post.id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    book_id: PropTypes.string.isRequired, // Ensuring book_id is a string
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;

import React, {useState, useEffect} from 'react';
import CustomRating from './CustomRating';
import PropTypes from 'prop-types';
import { useCreatePost } from '../helpers/hooks/apiData/usePostData';
import './PostForm.scss';
import { useNavigate } from 'react-router-dom';

const PostForm = ({currentUser, bookId, onPostCreation, setPostFormSelected}) => {
  const [rating, setRating] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [review, setReview] = useState('');
  const [hours, setHours] = useState('');

  const { post, loading, error, handleCreatePost} = useCreatePost();
  const navigate = useNavigate();

useEffect(() => {
  if (post) {
    onPostCreation(post); // Notify parent about the new post
    setRating('');
    setTimeSpent('');
    setReview('');
    setHours('');

  }
}, [post, onPostCreation]);



const handleSubmit = (event) => {
  event.preventDefault();

    const numericRating = Number(rating);
    if (rating === "" || isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      console.error('Invalid rating value');
      return;
    }


    if (!bookId) {
      console.error('Book ID is required');
      return;
    }

    
    const timeSpentNumber = hours ? parseFloat(hours) : null;

    const postData= {
    
    rating: numericRating,    
    time_spent: timeSpentNumber,
    review,
    user_id: currentUser,
    book_id: bookId,
  };

  console.log('Submitting post data:', postData); 


  handleCreatePost(postData);


};

return (
  <div className='post-form-container'>
    <div className='post-form-card card'>
      <h2> Create a Post:</h2>
   
      <CustomRating rating={rating} setRating={setRating} />

      <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='review' className='form-label'>Book Review:</label>
      <textarea
        id="review"
        type="text"
        name="review"
        rows="5"
        placeholder="Write a post:"
        className='form-control'
        value={review}
        onChange={(event) => setReview(event.target.value)}
        required
        />
      </div >

      
    <div className='col-md-2'>
    <label htmlFor='hours' className='form-label'>Time Spent (Hours):</label>
    <input
      id="hours"
      type="number"
      className='form-control'
      placeholder='0'
      value={hours}
      onChange={(event) => setHours(event.target.value)}
      required
    />
  </div>
 
      <div>
        <button type="submit" className='btn btn-primary' disabled={loading}> 
          {loading ? 'Creating post....' : 'Create My Post' } 
        </button>
        {error && <p className='text-danger mt-2'>Error while creating the post: {error.message}</p>}
      </div>
      <button onClick={() => setPostFormSelected(false)}>Back</button>

      </form>
    </div>
    </div>
  );
};

PostForm.propTypes = {
  onPostCreation: PropTypes.func.isRequired,
};

export default PostForm;


import React, {useState, useEffect} from 'react';
import CustomRating from './CustomRating';
import PropTypes from 'prop-types';
import { useCreatePost } from '../helpers/hooks/apiData/usePostData';


const PostForm = ({onPostCreation, loggedinUserId, selectedBookId}) => {
  const [rating, setRating] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [review, setReview] = useState('');
  // const [userId, setUserId] = useState('');
  // const [bookId, setBookId] = useState('');
  // const [users, setUsers] = useState([]);
  // const [books, setBooks] = useState([]);
  const [hours, setHours] = useState('');

  const { post, loading, error, handleCreatePost} = useCreatePost();

// useEffect(() => {
//   fetch("/users")
//     .then((response) => response.json())
//     .then((userinfo) => setUsers(userinfo))
//     .catch((error) => {
//       console.error('Error fetching users:', error);
//     });

//   fetch("/books")
//     .then((response) => response.json())
//     .then((bookinfo) => setBooks(bookinfo))
//     .catch((error) => {
//       console.error('Error fetching books:', error);
//     });
// }, []);

useEffect(() => {
  if (post) {
    onPostCreation(post);
    setRating('');
    setTimeSpent('');
    setReview('');
    setUserId('');
    setBookId('');
    setHours('');
  }
}, [post, onPostCreation]);


const handleSubmit = (event) => {
  event.preventDefault();

  const postData= {
    
    rating,
    time_spent: timeSpent,
    review,
    user_id: loggedinUserId,
    book_id: selectedBookId,
  };

  handleCreatePost(postData);


};

return (
  <div >
      <CustomRating rating={rating} setRating={setRating} />

      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='review'>Book Review:</label>
      <textarea
        type="text"
        name="review"
        rows="5"
        placeholder="Write a post:"
        value={review}
        onChange={(event) => setReview(event.target.value)}
        />
      </div >

      
      <div>
    <label>Time Spent (Hours):</label>
    <input
      type="number"
      value={hours}
      onChange={(e) => setHours(e.target.value)}
      required
    />
  </div>
 
      <div>
        <button type="submit" disabled={loading}> 
          {loading ? 'Creating post....' : 'Create My Post' } 
        </button>
        {error && <p>Error while creating the post: {error.message}</p>}
      </div>

      </form>
    </div>
  );
};

PostForm.propTypes = {
  onPostCreation: PropTypes.func.isRequired,
};

export default PostForm;

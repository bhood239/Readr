import React, {useState} from 'react';
import CustomRating from './CustomRating';


const PostForm = ({onPostCreation}) => {
  const [rating, setRating] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [review, setReview] = useState('');
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

useEffect(() => {
  fetch("/users")
    .then((response) => response.json())
    .then((userinfo) => setUsers(userinfo))
    .catch((error) => {
      console.error('Error fetching users:', error);
    });

  fetch("/books")
    .then((response) => response.json())
    .then((bookinfo) => setBooks(bookinfo))
    .catch((error) => {
      console.error('Error fetching books:', error);
    });
}, []);

const handleSubmit = (event) => {
  event.preventDefault();

  const post= {
    id,
    rating,
    time_spent: timeSpent,
    review,
    user_id: userId,
    book_id: bookId,
  };

  fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify(post),
  })
    .then((respose) => respose.json())
    .then((newPost) => {
      onPostCreation(data);
      setRating("");
      setTimeSpent("");
      setReview("");
      setUserId("");
      setBookId("");
    })
    .catch((error) => {
      console.error('Error while creating the new post:', error);
    });

};

return (
  <div >
    <div >
      <CustomRating />
      <textarea
              type="text"
              name="review"
              rows="5"
              placeholder="Write a post:"
              value={review}
              onChange={(event) => setReview(event.target.value)}
            />
      <div >
        <form onSubmit={handleSubmit}>
            <button > Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
};



export default PostForm;
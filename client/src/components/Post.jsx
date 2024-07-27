
import React from 'react';
import PropTypes from 'prop-types';


const Post = (props) => {
  const {post, editPost, deletePost, isPostByUser} = props 

  return (
    <div className="post">
      <div>
      <img src={post.user.profilePhoto} alt={post.user.name} />
      <h4>{post.user.name}</h4>
      </div>

      {isPostByUser(post.user_id) && 
      <div>
      <button onClick={()=> editPost(post.id)}>Edit</button> 
      <button onClick={()=> deletePost(post.id)}>Delete</button> 
      </div>
      }



      <div>
        <img src={post.book.cover} alt={post.book.title} />
      <h5>Book: {post.book.title} by {post.book.author}</h5>
      <p>Rating: {post.rating} </p>
      <p>Review: {post.review}</p>
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
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;

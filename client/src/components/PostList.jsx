import React from 'react';
// import PropTypes from 'prop-types';
import Post from './Post';
import { useAllPosts } from '../helpers/hooks/apiData/usePostData';

const PostList = ({currentUser, onEdit, onDelete }) => {

    // // Check that onPostEdit and onPostDelete are functions
    // console.log("onPostEdit:", typeof onPostEdit);
    // console.log("onPostDelete:", typeof onPostDelete);
  const {posts, loading, error} = useAllPosts(currentUser);

  if (loading) {
    return <div className="text-center"> Posts Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger"> Error while loading posts: {error.message}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center"> No posts to show at this time.</div>;
  }

  // Sort posts by created_at in descending order
  const sortedPosts = posts?.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


  return (

    <div className="container-fluid post-list"> {/* Change to container-fluid if needed */}
      <div className="card-body">
        {sortedPosts.map((post) => (
          <div key={post.id} className="mb-3">
            <div className="card post-item">
              <Post 
                post={post}   
                currentUser={currentUser}
                onEdit={onEdit}
                onDelete={onDelete} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
 
  );

};

export default PostList;

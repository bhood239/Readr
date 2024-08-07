import React from 'react';
import CustomRating from './CustomRating';
import Post from './Post';
import './PostList.scss';
import { useAllPosts } from '../helpers/hooks/apiData/usePostData';

const PostList = () => {
  const {posts, loading, error} = useAllPosts();

  if (loading) {
    return <div className="text-center"> Posts Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger"> Error while loading posts: {error.message}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center"> No posts to show at this time.</div>;
  }

  // Sort posts by creation date (assuming each post has a `created_at` field)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (

    <div className="container-fluid post-list"> {/* Change to container-fluid if needed */}
      <div className="card-body">
        {sortedPosts.map((post) => (
          <div key={post.id} className="mb-3">
            <div className="card post-item">
              <Post post={post} />
            </div>
          </div>
        ))}
      </div>
    </div>
 
  );

};


export default PostList;
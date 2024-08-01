import React from 'react';
import { useUserById } from '../helpers/hooks/apiData/useUserData';

const MiniProfile = ({ userId, toRead, reading, read, loadProfile }) => {
  const { user, loading, error } = useUserById(userId);

  const numOfToRead = toRead.length;
  const numOfReading = reading.length;
  const numOfRead = read.length;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <img className="profile_picture" src={user.profile_photo} alt={user.username} />
      <span>{user.username}</span>
      <div>
        <div>
          <span>Following</span>
          <span>{user.following}</span>
        </div>
        <div>
          <span>Followers</span>
          <span>{user.followers}</span>
        </div>
      </div>
      <div>
        <div>
          <span>To Read</span>
          <span>{numOfToRead}</span>
        </div>
        <div>
          <span>Reading</span>
          <span>{numOfReading}</span>
        </div>
        <div>
          <span>Read</span>
          <span>{numOfRead}</span>
        </div>
      </div>
      <span onClick={loadProfile}>Your Profile</span>
    </div>
  );
};

export default MiniProfile;

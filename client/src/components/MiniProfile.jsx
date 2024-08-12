import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Profile from "../routes/Profile";
import "../styles/MiniProfile.css";

const MiniProfile = (props) => {
  const {
    currentUser,
    wantToRead,
    reading,
    read,
    favBooks,
    handleCreateFriend,
    handleDeleteFriend,
  } = props;
  const numOfToRead = wantToRead.length;
  const numOfReading = reading.length;
  const numOfRead = read.length;

  return (
    <div className="mini-profile-container">
      <div className="mini-profile-card">
        <img
          className="profile-picture"
          src={currentUser.profile_pic}
          alt="user image"
        />
        <div className="card-body">
          <h5 className="card-title">{currentUser.name}</h5>
          <ul className="profile-stats">
            <li>
              <span>Following:</span>
              <span>{currentUser.following}</span>
            </li>
            <li>
              <span>Followers:</span>
              <span>{currentUser.followers}</span>
            </li>
            <li>
              <span>Want to Read:</span>
              <span>{numOfToRead}</span>
            </li>
            <li>
              <span>Reading:</span>
              <span>{numOfReading}</span>
            </li>
            <li>
              <span>Read:</span>
              <span>{numOfRead}</span>
            </li>
          </ul>
          <div className="profile-action">
            <nav>
              <Link to="/profile" className="profile-btn">
                Your Profile
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <Routes>
        <Route
          path="/profile"
          element={
            currentUser && (
              <Profile
                currentUser={currentUser}
                wantToRead={wantToRead}
                reading={reading}
                read={read}
                favBooks={favBooks}
                handleCreateFriend={handleCreateFriend}
                handleDeleteFriend={handleDeleteFriend}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default MiniProfile;

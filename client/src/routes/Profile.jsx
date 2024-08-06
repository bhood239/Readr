import React, { useState } from "react";
import BookList from "../components/BookList";
import UserList from "../components/UserList";
import { Container, Col, Image, Row } from "react-bootstrap";
import SearchUsers from "../components/SearchUsers";
import "../styles/Profile.css";

// import { useUserById } from '../helpers/hooks/apiData/useUserData'; //uncomment when user info is setup properly

const Profile = (props) => {
  // userId, replace user once properly set up.
  // const { user, loading, error } = useUserById(userId);
  const {
    currentUser,
    wantToRead,
    reading,
    read,
    favBooks,
    popularBooks,
    handleCreateFriend,
    handleDeleteFriend,
    handleCreateBookStatus,
    updateBookStatus,
    allBookStatuses,
  } = props;
  const [selectedOption, setSelectedOption] = useState("To Be Read");

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const renderBookList = () => {
    switch (selectedOption) {
      case "To Be Read":
        return wantToRead.length > 0 ? (
          <div>
            <BookList
              books={wantToRead}
              currentUser={currentUser}
              wantToRead={wantToRead}
              reading={reading}
              read={read}
              favBooks={favBooks}
              handleCreateBookStatus={handleCreateBookStatus}
              updateBookStatus={updateBookStatus}
              allBookStatuses={allBookStatuses}
            />
          </div>
        ) : (
          <div>No books to be read</div>
        );
      case "Reading":
        return reading.length > 0 ? (
          <div>
            <BookList
              books={reading}
              currentUser={currentUser}
              wantToRead={wantToRead}
              reading={reading}
              read={read}
              favBooks={favBooks}
              handleCreateBookStatus={handleCreateBookStatus}
              updateBookStatus={updateBookStatus}
              allBookStatuses={allBookStatuses}
            />
          </div>
        ) : (
          <div>No books currently being read</div>
        );
      case "Read":
        return read.length > 0 ? (
          <div>
            <BookList
              books={read}
              currentUser={currentUser}
              wantToRead={wantToRead}
              reading={reading}
              read={read}
              favBooks={favBooks}
              handleCreateBookStatus={handleCreateBookStatus}
              updateBookStatus={updateBookStatus}
              allBookStatuses={allBookStatuses}
            />
          </div>
        ) : (
          <div>No books read</div>
        );
      case "My Books":
        return favBooks.length > 0 ? (
          <div>
            <BookList
              books={favBooks}
              currentUser={currentUser}
              wantToRead={wantToRead}
              reading={reading}
              read={read}
              favBooks={favBooks}
              handleCreateBookStatus={handleCreateBookStatus}
              updateBookStatus={updateBookStatus}
              allBookStatuses={allBookStatuses}
            />
          </div>
        ) : (
          <div>No favorite books</div>
        );
      case "Followers List":
        const followersList = currentUser.followers_list;
        return followersList.length > 0 ? (
          <div>
            <UserList
              users={followersList}
              currentUser={currentUser}
              handleCreateFriend={handleCreateFriend}
              handleDeleteFriend={handleDeleteFriend}
            />
          </div>
        ) : (
          <div>No followers</div>
        );
      case "Following List":
        const followingList = currentUser.following_list;
        return followingList.length > 0 ? (
          <div>
            <UserList
              users={followingList}
              currentUser={currentUser}
              handleCreateFriend={handleCreateFriend}
              handleDeleteFriend={handleDeleteFriend}
            />
          </div>
        ) : (
          <div>No followers</div>
        );
      case "Popular Books":
        return popularBooks.length > 0 ? (
          <div>
            <BookList
              books={popularBooks}
              currentUser={currentUser}
              wantToRead={wantToRead}
              reading={reading}
              read={read}
              favBooks={favBooks}
              handleCreateBookStatus={handleCreateBookStatus}
              updateBookStatus={updateBookStatus}
              allBookStatuses={allBookStatuses}
            />
          </div>
        ) : (
          <div>No popular books</div>
        );
      case "Search Users":
        return (
          <div>
            <SearchUsers
              currentUser={currentUser}
              handleCreateFriend={handleCreateFriend}
              handleDeleteFriend={handleDeleteFriend}
            />
          </div>
        );
      default:
        return null;
    }
  };

  //uncomment when user info is properly setup
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <Container className="container">
      <Row className="profile-header">
        <Col xs={12} className="profile-image-section">
          <Image
            src={currentUser?.profile_pic}
            fluid
            className="profile-image"
          />
          <h1 className="profile-name">{currentUser?.name}</h1>
        </Col>
      </Row>

      <Row className="profile-info-section">
        <Col xs={12} className="profile-details">
          <div className="follow">
            <h3>
              <a
                href="#"
                className="link"
                onClick={() => handleSelectOption("Followers List")}
              >
                Followers
              </a>
            </h3>
            <span>{currentUser?.followers}</span>
          </div>
          <div className="follow">
            <h3>
              <a
                href="#"
                className="link"
                onClick={() => handleSelectOption("Following List")}
              >
                Following
              </a>
            </h3>
            <span>{currentUser?.following}</span>
          </div>
        </Col>
      </Row>

      <Row className="profile-content">
        <Col xs={12} md={3} className="list-group-section">
          <div className="list-group">
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => handleSelectOption("To Be Read")}
            >
              To Be Read
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => handleSelectOption("Reading")}
            >
              Reading
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => handleSelectOption("Read")}
            >
              Read
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => handleSelectOption("My Books")}
            >
              My Books
            </a>
          </div>
        </Col>

        <Col xs={12} md={6} className="book-list-section">
          {renderBookList()}
        </Col>

        <Col xs={12} md={3} className="right-side">
          <a
            href="#"
            className="link"
            onClick={() => handleSelectOption("Popular Books")}
          >
            Popular Books
          </a>
          <a
            href="#"
            className="link"
            onClick={() => handleSelectOption("Search Users")}
          >
            Find People
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

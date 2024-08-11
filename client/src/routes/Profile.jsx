import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookList from "../components/BookList";
import UserList from "../components/UserList";
import SearchUsers from "../components/SearchUsers";
import "../styles/Profile.css";
import PostForm from "../components/PostForm";
import { useUserById } from "../helpers/hooks/apiData/useUserData";

const Profile = (props) => {
  const {
    currentUser,
    selectedUser,
    setSelectedUser,
    wantToRead,
    setWantToRead,
    reading,
    setReading,
    read,
    setRead,
    favBooks,
    setFavBooks,
    popularBooks,
    setPopularBooks,
    toReadLoading,
    readingLoading,
    readLoading,
    favBookLoading,
    popularBookLoading,
    toReadError,
    readingError,
    readError,
    favBookError,
    popularBookError,
    handleCreateFriend,
    handleDeleteFriend,
    handleCreateBookStatus,
    updateBookStatus,
    allBookStatuses,
    addPost,
    postFormSelected,
    setPostFormSelected,
    postFormBookId,
    onPostCreation,
    fetchAllBooksDetails,
  } = props;
  const [selectedOption, setSelectedOption] = useState("To Be Read");

    const { getUser } = useUserById();

    const location = useLocation();
    const { state } = location;
    // const selectedUser = location.state?.selectedUser || currentUser;
    const user = selectedUser || currentUser;

    const [followersList, setFollowersList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [loadingFollowers, setLoadingFollowers] = useState(false);
    const [loadingFollowing, setLoadingFollowing] = useState(false);
    const [errorFollowers, setErrorFollowers] = useState(null);
    const [errorFollowing, setErrorFollowing] = useState(null); 

    useEffect(() => {
        if (selectedOption === 'Followers List') {
            setLoadingFollowers(true);
            setErrorFollowers(null);
            const fetchFollowers = async () => {
                try {
                    const followerPromises = user.followers_list.map((follower) => getUser(follower.id));
                    const followersList = await Promise.all(followerPromises);
                    setFollowersList(followersList);
                } catch (error) {
                    setErrorFollowers('Error loading followers');
                } finally {
                    setLoadingFollowers(false);
                }
            };
            fetchFollowers();
        }
    }, [selectedOption, user.followers_list]);

    useEffect(() => {
        if (selectedOption === 'Following List') {
            setLoadingFollowing(true);
            setErrorFollowing(null);
            const fetchFollowing = async () => {
                try {
                    const followingPromises = user.following_list.map((following) => getUser(following.id));
                    const followingList = await Promise.all(followingPromises);
                    setFollowingList(followingList);
                } catch (error) {
                    setErrorFollowing('Error loading following');
                } finally {
                    setLoadingFollowing(false);
                }
            };
            fetchFollowing();
        }
    }, [selectedOption, user.following_list]);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const renderBookList = () => {
        if (postFormSelected) {
            return (
                <PostForm
                    currentUser={currentUser.id}
                    postFormBookId={postFormBookId}
                    onPostCreation={onPostCreation}
                    setPostFormSelected={setPostFormSelected}
                />
            );
        }

    switch (selectedOption) {
      case "To Be Read":
        return wantToRead.length > 0 ? (
          <BookList
            books={wantToRead}
            loading={toReadLoading}
            error={toReadError}
            currentUser={currentUser}
            wantToRead={wantToRead}
            reading={reading}
            read={read}
            favBooks={favBooks}
            handleCreateBookStatus={handleCreateBookStatus}
            updateBookStatus={updateBookStatus}
            allBookStatuses={allBookStatuses}
            addPost={addPost}
            fetchAllBooksDetails={fetchAllBooksDetails}
            setWantToRead={setWantToRead}
            setReading={setReading}
            setRead={setRead}
            setFavBooks={setFavBooks}
          />
        ) : (
          <div>No books to be read</div>
        );
      case "Reading":
        return reading.length > 0 ? (
          <BookList
            books={reading}
            loading={readingLoading}
            error={readingLoading}
            currentUser={currentUser}
            wantToRead={wantToRead}
            reading={reading}
            read={read}
            favBooks={favBooks}
            handleCreateBookStatus={handleCreateBookStatus}
            updateBookStatus={updateBookStatus}
            allBookStatuses={allBookStatuses}
            addPost={addPost}
            fetchAllBooksDetails={fetchAllBooksDetails}
            setWantToRead={setWantToRead}
            setReading={setReading}
            setRead={setRead}
            setFavBooks={setFavBooks}
          />
        ) : (
          <div>No books currently being read</div>
        );
      case "Read":
        return read.length > 0 ? (
          <BookList
            books={read}
            loading={readLoading}
            error={readError}
            currentUser={currentUser}
            wantToRead={wantToRead}
            reading={reading}
            read={read}
            favBooks={favBooks}
            handleCreateBookStatus={handleCreateBookStatus}
            updateBookStatus={updateBookStatus}
            allBookStatuses={allBookStatuses}
            addPost={addPost}
            fetchAllBooksDetails={fetchAllBooksDetails}
            setWantToRead={setWantToRead}
            setReading={setReading}
            setRead={setRead}
            setFavBooks={setFavBooks}
          />
        ) : (
          <div>No books read</div>
        );
      case "My Books":
        return favBooks.length > 0 ? (
          <BookList
            books={favBooks}
            loading={favBookLoading}
            error={favBookError}
            currentUser={currentUser}
            wantToRead={wantToRead}
            reading={reading}
            read={read}
            favBooks={favBooks}
            handleCreateBookStatus={handleCreateBookStatus}
            updateBookStatus={updateBookStatus}
            allBookStatuses={allBookStatuses}
            addPost={addPost}
            fetchAllBooksDetails={fetchAllBooksDetails}
            setWantToRead={setWantToRead}
            setReading={setReading}
            setRead={setRead}
            setFavBooks={setFavBooks}
          />
        ) : (
          <div>No favorite books</div>
        );
      case "Followers List":
        return followersList.length > 0 ? (
          <UserList
            users={followersList}
            currentUser={currentUser}
            user={user}
            setSelectedUser={setSelectedUser}
            handleCreateFriend={handleCreateFriend}
            handleDeleteFriend={handleDeleteFriend}
          />
        ) : (
          <div>No followers</div>
        );
      case "Following List":
        return followingList.length > 0 ? (
          <UserList
            users={followingList}
            currentUser={currentUser}
            user={user}
            setSelectedUser={setSelectedUser}
            handleCreateFriend={handleCreateFriend}
            handleDeleteFriend={handleDeleteFriend}
          />
        ) : (
          <div>No following</div>
        );
      case "Popular Books":
        return popularBooks.length > 0 ? (
          <BookList
            books={popularBooks}
            loading={popularBookLoading}
            error={popularBookError}
            currentUser={currentUser}
            wantToRead={wantToRead}
            reading={reading}
            read={read}
            favBooks={favBooks}
            handleCreateBookStatus={handleCreateBookStatus}
            updateBookStatus={updateBookStatus}
            allBookStatuses={allBookStatuses}
            addPost={addPost}
            fetchAllBooksDetails={fetchAllBooksDetails}
            setWantToRead={setWantToRead}
            setReading={setReading}
            setRead={setRead}
            setFavBooks={setFavBooks}
          />
        ) : (
          <div>No popular books</div>
        );
      case "Search Users":
        return (
          <SearchUsers
            currentUser={currentUser}
            setSelectedUser={setSelectedUser}
            handleCreateFriend={handleCreateFriend}
            handleDeleteFriend={handleDeleteFriend}
            addPost={addPost}
          />
        );
      default:
        return null;
    }
  };

    return (
        <div className="container">
            <div className="profile-header">
                <div className="profile-image-section">
                    <img
                        src={user?.profile_pic}
                        alt="Profile"
                        className="profile-image"
                    />
                    <h1 className="profile-name">{user?.name}</h1>
                </div>
            </div>

            <div className="profile-info-section">
                <div className="profile-details">
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
                        <span>{user?.followers}</span>
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
                        <span>{user?.following}</span>
                    </div>
                </div>
            </div>

            <div className="profile-content">
                <div className="list-group-section">
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
                            Favorite Books
                        </a>
                    </div>
                </div>

                <div className="book-list-section">{renderBookList()}</div>

                <div className="right-side">
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
                </div>
            </div>
        </div>
    );
};

export default Profile;

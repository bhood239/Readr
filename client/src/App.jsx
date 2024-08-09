import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styles/App.css";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import Homepage from "./routes/Homepage";
import SearchResult from "./components/SearchResults";
import useUserBooks from "./helpers/hooks/apiData/useUserBooksData";
import "./styles/main.scss";
import {
  useCreateFriend,
  useDeleteFriend,
} from "./helpers/hooks/apiData/useFriends";
import PostList from "./components/PostList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import {
  useAllBookStatuses,
  useCreateBookStatus,
  useUpdateBookStatusByUserAndBook,
  useBookStatusByUserAndBook,
} from "./helpers/hooks/apiData/useBookStatusdata";
import {
  usePostByUserIdAndBookId,
  useAllPosts,
} from "./helpers/hooks/apiData/usePostData";

const App = () => {
  const navigate = useNavigate();

  const {
    currentUser,
    setCurrentUser,
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
    fetchAllBooksDetails,
  } = useUserBooks();
  const { handleCreateFriend } = useCreateFriend();
  const { handleDeleteFriend } = useDeleteFriend();
  const { handleCreateBookStatus } = useCreateBookStatus(currentUser);
  const { updateBookStatus } = useUpdateBookStatusByUserAndBook(currentUser);
  const { handlePostByUserIdAndBookId } = usePostByUserIdAndBookId();
  const { bookStatuses, loading, error } = useAllBookStatuses(currentUser);
  const [loginSelected, setLoginSelected] = useState(false);
  const [registerSelected, setRegisterSelected] = useState(false);
  const {
    posts: initialPosts,
    loading: postsLoading,
    error: postsError,
  } = useAllPosts(); // Fetch initial posts
  const [posts, setPosts] = useState([]);
  const [postFormBookId, setPostFormBookId] = useState();
  const [postFormSelected, setPostFormSelected] = useState(false);
  const [editPostSelected, setEditPostSelected] = useState(false);
  const [viewPostList, setViewPostList] = useState(false);
  useEffect(() => {
    // Redirect to homepage if not logged in
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const addPost = (bookId) => {
    if (currentUser) {
      setPostFormBookId(bookId);
      setPostFormSelected(true);
      // const post = handlePostByUserIdAndBookId(currentUser.id, bookId);
      // post ? setEditPostSelected(true) : setPostFormSelected(true);
    }
  };

  const handleLogout = () => {
    // Simulate a user logging out
    setCurrentUser(null);
    navigate("/");
  };

  const handlePostCreation = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Update posts state with the new post
    setPostFormSelected(false); // Hide PostForm
    setViewPostList(true); // Show PostList
  };

  useEffect(() => {
    if (!postsLoading && !postsError) {
      setPosts(initialPosts || []); // Update local posts state with initial data
    }
  }, [initialPosts, postsLoading, postsError]);

  return (
    <div className="App">
      <TopNavBar
        currentUser={currentUser}
        handleLogout={handleLogout}
        setLoginSelected={setLoginSelected}
        setRegisterSelected={setRegisterSelected}
        navigate={navigate}
      />
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Dashboard
                currentUser={currentUser}
                wantToRead={wantToRead}
                setWantToRead={setWantToRead}
                reading={reading}
                setReading={setReading}
                read={read}
                setRead={setRead}
                favBooks={favBooks}
                setFavBooks={setFavBooks}
                popularBooks={popularBooks}
                setPopularBooks={setPopularBooks}
                handleCreateFriend={handleCreateFriend}
                handleDeleteFriend={handleDeleteFriend}
                handleCreateBookStatus={handleCreateBookStatus}
                updateBookStatus={updateBookStatus}
                allBookStatuses={bookStatuses}
                addPost={addPost}
                postFormSelected={postFormSelected}
                setPostFormSelected={setPostFormSelected}
                postFormBookId={postFormBookId}
                onPostCreation={handlePostCreation}
                posts={posts}
                fetchAllBooksDetails={fetchAllBooksDetails}
              />
            ) : (
              <Homepage
                setCurrentUser={setCurrentUser}
                loginSelected={loginSelected}
                registerSelected={registerSelected}
                setLoginSelected={setLoginSelected}
                setRegisterSelected={setRegisterSelected}
                navigate={navigate}
              />
            )
          }
        />
        <Route
          path="/profile"
          element={
            currentUser ? (
              <Profile
                currentUser={currentUser}
                wantToRead={wantToRead}
                setWantToRead={setWantToRead}
                reading={reading}
                setReading={setReading}
                read={read}
                setRead={setRead}
                favBooks={favBooks}
                setFavBooks={setFavBooks}
                popularBooks={popularBooks}
                setPopularBooks={setPopularBooks}
                toReadLoading={toReadLoading}
                readingLoading={readingLoading}
                readLoading={readLoading}
                favBookLoading={favBookLoading}
                popularBookLoading={popularBookLoading}
                toReadError={toReadError}
                readingError={readingError}
                readError={readError}
                favBookError={favBookError}
                popularBookError={popularBookError}
                handleCreateFriend={handleCreateFriend}
                handleDeleteFriend={handleDeleteFriend}
                handleCreateBookStatus={handleCreateBookStatus}
                updateBookStatus={updateBookStatus}
                allBookStatuses={bookStatuses}
                addPost={addPost}
                postFormSelected={postFormSelected}
                setPostFormSelected={setPostFormSelected}
                postFormBookId={postFormBookId}
                onPostCreation={handlePostCreation}
                posts={posts}
                fetchAllBooksDetails={fetchAllBooksDetails}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/search"
          element={
            currentUser ? (
              <SearchResult
                currentUser={currentUser}
                wantToRead={wantToRead}
                setWantToRead={setWantToRead}
                reading={reading}
                setReading={setReading}
                read={read}
                setRead={setRead}
                favBooks={favBooks}
                setFavBooks={setFavBooks}
                handleCreateBookStatus={handleCreateBookStatus}
                updateBookStatus={updateBookStatus}
                allBookStatuses={bookStatuses}
                addPost={addPost}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      {viewPostList && (
        <PostList posts={posts} loading={postsLoading} error={postsError} />
      )}{" "}
      {/* Render PostList when state is set */}
      <Footer navigate={navigate} />
    </div>
  );
};
export default App;

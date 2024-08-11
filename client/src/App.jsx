import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
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
import {
  useAllBookStatuses,
  useCreateBookStatus,
  useUpdateBookStatusByUserAndBook,
  useBookStatusByUserAndBook,
} from "./helpers/hooks/apiData/useBookStatusdata";
import {
    useCreatePost,
    usePostByUserIdAndBookId,
    useAllPosts,
    useUpdatePostById,
    useDeletePostById
} from "./helpers/hooks/apiData/usePostData";

const App = () => {
  const navigate = useNavigate();

  // Load currentUser from localStorage on app load
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const {
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
  } = useUserBooks(currentUser);
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


    // useEffect(() => {
    //     if (!postsLoading && !postsError) {
    //         setPosts(initialPosts || []); // Update local posts state with initial data
    //     }
    // }, [initialPosts, postsLoading, postsError]);

    const addPost = (bookId) => {
      if (currentUser) {
          setPostFormBookId(bookId);
          // setPostFormSelected(true);
          // const post = handlePostByUserIdAndBookId(currentUser.id, bookId);
          // post ? setEditPostSelected(true) : setPostFormSelected(true);
          handlePostByUserIdAndBookId(currentUser.id, bookId).then(() => {
            setEditPostSelected(existingPost ? true : false);
            setPostFormSelected(true);
        });
      }
  };

  
  const handlePostCreation = (updatedPost) => {
    setPosts((prevPosts) =>
        prevPosts.map((post) => 
            post.id === updatedPost.id ? updatedPost : post
        )
      );
    // fetchPosts();
    setPostFormSelected(false); // Hide PostForm
    setViewPostList(true); // Show PostList
  };

  const handlePostUpdate = async (id, updatedData) => {
    console.log("Initiating post update...");
    try {
        const newPostData = await updatePost(id, updatedData);
        if (newPostData) {
            console.log("Post updated:", newPostData);
            setPosts((prevPosts) =>
                prevPosts.map((post) => (post.id === id ? newPostData : post))
            );
        } else {
            console.error("No post data returned from API");
        }
    } catch (error) {
        console.error("Error updating post:", error);
    }
};

const handlePostDeletion = async (id) => {
    console.log("Initiating post deletion...");
    try {
        await deletePost(id);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        console.log("Post deleted:", id);
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};



  const handleLogout = () => {
    // Simulate a user logging out
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
  };


  useEffect(() => {
    if (!postsLoading && !postsError) {
      setPosts(initialPosts || []); // Update local posts state with initial data
    }
  }, [initialPosts, postsLoading, postsError]);

  useEffect(() => {
    if (currentUser) {
      // Store the currentUser in localStorage whenever it changes
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

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
                onEdit={handlePostUpdate}
                onDelete={handlePostDeletion}
                existingPost={existingPost}
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
                fetchAllBooksDetails={fetchAllBooksDetails}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default App;

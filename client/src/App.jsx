
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

import { useCreateFriend, useDeleteFriend } from "./helpers/hooks/apiData/useFriends";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import { useAllBookStatuses, useCreateBookStatus, useUpdateBookStatusByUserAndBook } from "./helpers/hooks/apiData/useBookStatusdata";
import { usePostByUserIdAndBookId, useAllPosts } from "./helpers/hooks/apiData/usePostData";

const App = () => {
    const navigate = useNavigate();

    const { currentUser, setCurrentUser, wantToRead, reading, read, favBooks, popularBooks } = useUserBooks();
    const { handleCreateFriend } = useCreateFriend();
    const { handleDeleteFriend } = useDeleteFriend();
    const { handleCreateBookStatus } = useCreateBookStatus();
    const { updateBookStatus } = useUpdateBookStatusByUserAndBook();
    const { handlePostByUserIdAndBookId } = usePostByUserIdAndBookId();
    const { bookStatuses: allBookStatuses, loading, error } = useAllBookStatuses();
    const [loginSelected, setLoginSelected] = useState(false);
    const [registerSelected, setRegisterSelected] = useState(false);
    const { posts: initialPosts, loading: postsLoading, error: postsError } = useAllPosts(); // Fetch initial posts
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
            const post = handlePostByUserIdAndBookId(currentUser.id, bookId);
            post ? setEditPostSelected(true) : setPostFormSelected(true);
        }
    };

    const handleLogout = () => {
        // Simulate a user logging out
        setCurrentUser(null);
        navigate("/");
    };

    const handlePostCreation = (newPost) => {
      console.log("New post created: ", newPost);
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Update posts state with the new post

      setPostFormSelected(false); // Hide PostForm
      setViewPostList(true);   // Show PostList
  }
  
  useEffect(() => {
    if (!postsLoading && !postsError) {
        setPosts(initialPosts); // Update local posts state with initial data
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
                                reading={reading}
                                read={read}
                                favBooks={favBooks}
                                popularBooks={popularBooks}
                                handleCreateFriend={handleCreateFriend}
                                handleDeleteFriend={handleDeleteFriend}
                                handleCreateBookStatus={handleCreateBookStatus}
                                updateBookStatus={updateBookStatus}
                                allBookStatuses={allBookStatuses}
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
                                reading={reading}
                                read={read}
                                favBooks={favBooks}
                                popularBooks={popularBooks}
                                handleCreateFriend={handleCreateFriend}
                                handleDeleteFriend={handleDeleteFriend}
                                handleCreateBookStatus={handleCreateBookStatus}
                                updateBookStatus={updateBookStatus}
                                allBookStatuses={allBookStatuses}
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
                                reading={reading}
                                read={read}
                                favBooks={favBooks}
                                handleCreateBookStatus={handleCreateBookStatus}
                                updateBookStatus={updateBookStatus}
                                allBookStatuses={allBookStatuses}
                            />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
          {postFormSelected && ( 
            <PostForm currentUser={currentUser.id} bookId={postFormBookId} onPostCreation={handlePostCreation} />
          )}
          {viewPostList && <PostList posts={posts} />} {/* Render PostList when state is set */}


      <Footer navigate={navigate} />
      </div>
    );

  };
export default App;

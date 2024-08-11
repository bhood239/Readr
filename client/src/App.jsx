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
import './styles/main.scss'
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

    const {
        currentUser,
        setCurrentUser,
        wantToRead,
        reading,
        read,
        favBooks,
        popularBooks,
    } = useUserBooks();
    const { handleCreateFriend } = useCreateFriend();
    const { handleDeleteFriend } = useDeleteFriend();
    const { handleCreateBookStatus } = useCreateBookStatus(currentUser);
    const { updateBookStatus } = useUpdateBookStatusByUserAndBook(currentUser);
    const { post: existingPost, handlePostByUserIdAndBookId } = usePostByUserIdAndBookId(currentUser);
    const { handleCreatePost, post: createdPost, loading: createLoading, error: createError } = useCreatePost(currentUser);
    const { updatePost, loading: updateLoading, error: updateError } = useUpdatePostById(currentUser);
    const { deletePost, loading: deleteLoading, error: deleteError } = useDeletePostById(currentUser);


    const {
        bookStatuses: allBookStatuses,
        loading,
        error,
    } = useAllBookStatuses();
    const [loginSelected, setLoginSelected] = useState(false);
    const [registerSelected, setRegisterSelected] = useState(false);
    const {
        // posts: initialPosts,
        posts,
        setPosts,
        loading: postsLoading,
        error: postsError,
        fetchPosts
    } = useAllPosts(); // Fetch initial posts
    // const [posts, setPosts] = useState([]);
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
  navigate("/");
};

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
                                addPost={addPost}
                                postFormSelected={postFormSelected}
                                setPostFormSelected={setPostFormSelected}
                                postFormBookId={postFormBookId}
                                onPostCreation={handlePostCreation}
                                posts={posts}
                                onEdit={handlePostUpdate}
                                onDelete={handlePostDeletion}
                                existingPost={existingPost}
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
                                addPost={addPost}
                                postFormSelected={postFormSelected}
                                setPostFormSelected={setPostFormSelected}
                                postFormBookId={postFormBookId}
                                onPostCreation={handlePostCreation}
                                posts={posts}
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
                                addPost={addPost}
                            />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>


          {/* {viewPostList && <PostList 
                              posts={posts} 
                              loading={postsLoading} 
                              error={postsError} 
                              onEdit={handlePostUpdate}
                              onDelete={handlePostDeletion}
                              currentUser={currentUser} 
                            />} Render PostList when state is set */}

            
            <Footer navigate={navigate} />
        </div>
    );
};
export default App;

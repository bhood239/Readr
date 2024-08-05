// to include: TopNavBar, Footer, conditionally render: Homepage, Dashboard
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

const App = () => {
    const navigate = useNavigate();

    const { currentUser, setCurrentUser, wantToRead, reading, read, favBooks } = useUserBooks();
    const { handleCreateFriend } = useCreateFriend();
    const { handleDeleteFriend } = useDeleteFriend();
    const [loginSelected, setLoginselected] = useState(false);
    const [registerSelected, setRegisterSelected] = useState(false);
    const [postFormBookId, setPostFormBookId] = useState();
    const [postFormSelected, setPostFormSelected] = useState(false);

    const addPost = (bookId) => {
      setPostFormBookId(bookId);
      setPostFormSelected(true);
    }

    const handleLogout = () => {
        // Simulate a user logging out
        setCurrentUser(null);
        navigate("/");
    };

  const handlePostCreation = (newPost) => {
    console.log("New post created: ", newPost);
  }

    return (
        <div className="App">
            <TopNavBar
                currentUser={currentUser}
                handleLogout={handleLogout}
                setLoginselected={setLoginselected}
                setRegisterSelected={setRegisterSelected}
                navigate={navigate}
      
      />
            <Routes>
                <Route
                    path="/"
                    element={
                        currentUser ? (
                            <Dashboard />
                        ) : (
                            <Homepage
                                loginSelected={loginSelected}
                                registerSelected={registerSelected}
                                setLoginselected={setLoginselected}
                                setRegisterSelected={setRegisterSelected}
                                setCurrentUser={setCurrentUser}
                                currentUser={currentUser}
                            />
                        )
                    }
                />
                <Route
                    path="/profile"
                    element={currentUser &&
                        <Profile
                            currentUser={currentUser}
                            wantToRead={wantToRead}
                            reading={reading}
                            read={read}
                            favBooks={favBooks}
                            handleCreateFriend={handleCreateFriend}
                            handleDeleteFriend={handleDeleteFriend}
                        />} />
                <Route path="/search" element={currentUser && <SearchResult currentUser={currentUser} />} />
            </Routes>
          {postFormSelected && ( 
      <PostForm currentUser={currentUser.id} bookId={postFormBookId} />

      )}

      <Footer navigate={navigate} />
        </div>
    );
};

export default App;

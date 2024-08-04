// to include: TopNavBar, Footer, conditionally render: Homepage, Dashboard
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import Homepage from "./routes/Homepage";
import SearchResult from "./components/SearchResults";
import useUserBooks from "./helpers/hooks/apiData/useUserBooksData";
import { useCreateFriend, useDeleteFriend } from "./helpers/hooks/apiData/useFriends";


const App = () => {
    const navigate = useNavigate();
    //   const currentUser = { name: "John Doe", email: "johndoe@example.com" };

    const { currentUser, setCurrentUser, wantToRead, reading, read, favBooks } = useUserBooks();
    const { handleCreateFriend } = useCreateFriend();
    const { handleDeleteFriend } = useDeleteFriend();
    const [loginSelected, setLoginselected] = useState(false);
    const [registerSelected, setRegisterSelected] = useState(false);

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
            <Footer navigate={navigate} />
        </div>
    );
};

export default App;

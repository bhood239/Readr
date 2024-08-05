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
import { useAllBookStatuses, useCreateBookStatus, useUpdateBookStatusByUserAndBook } from "./helpers/hooks/apiData/useBookStatusdata";

const App = () => {
    const navigate = useNavigate();
    //   const currentUser = { name: "John Doe", email: "johndoe@example.com" };

    const { currentUser, setCurrentUser, wantToRead, reading, read, favBooks } = useUserBooks();
    const { handleCreateFriend } = useCreateFriend();
    const { handleDeleteFriend } = useDeleteFriend();
    const { handleCreateBookStatus } = useCreateBookStatus();
    const { updateBookStatus } = useUpdateBookStatusByUserAndBook();
    const { bookStatuses: allBookStatuses, loading, error } = useAllBookStatuses();
    const [loginSelected, setLoginSelected] = useState(false);
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
                                handleCreateFriend={handleCreateFriend}
                                handleDeleteFriend={handleDeleteFriend}
                            />
                        ) : (
                            <Homepage
                                loginSelected={loginSelected}
                                registerSelected={registerSelected}
                                setLoginSelected={setLoginSelected}
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
                <Route
                    path="/search"
                    element={currentUser &&
                        <SearchResult
                            currentUser={currentUser}
                            wantToRead={wantToRead}
                            reading={reading}
                            read={read}
                            favBooks={favBooks}
                            handleCreateBookStatus={handleCreateBookStatus}
                            updateBookStatus={updateBookStatus}
                            allBookStatuses={allBookStatuses}
                        />} />
            </Routes>
            <Footer navigate={navigate} />
        </div>
    );
};

export default App;

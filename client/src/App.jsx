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


const App = () => {
  const navigate = useNavigate();
//   const currentUser = { name: "John Doe", email: "johndoe@example.com" };

  const {currentUser, setCurrentUser, wantToRead, reading, read, favBooks} = useUserBooks();
  const [loginSelected, setLoginselected] = useState(false);
  const [registerSelected, setRegisterSelected] = useState(false);

  console.log('want to read:', wantToRead);
  console.log('reading:', reading);
  console.log('read:', read);

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
        <Route path="/profile" element={currentUser && <Profile currentUser={currentUser} wantToRead={wantToRead} reading={reading} read={read} favBooks={favBooks} />} />
        <Route path="/search" element={currentUser && <SearchResult currentUser={currentUser} />} />
      </Routes>
      <Footer navigate={navigate} />
    </div>
  );
};

export default App;

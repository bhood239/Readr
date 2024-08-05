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

const App = () => {
  const navigate = useNavigate();
  const currentUser = {
    name: "User One",
    email: "userone@example.com",
    password: "password",
  };

  const [user, setUser] = useState(null);
  const [loginSelected, setLoginSelected] = useState(false);
  const [registerSelected, setRegisterSelected] = useState(false);

  const handleLogout = () => {
    // Simulate a user logging out
    setUser(null);
    navigate("/");
  };

  return (
    <div className="App">
      <TopNavBar
        user={user}
        handleLogout={handleLogout}
        setLoginSelected={setLoginSelected}
        setRegisterSelected={setRegisterSelected}
        navigate={navigate}
      />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Dashboard />
            ) : (
              <Homepage
                loginSelected={loginSelected}
                registerSelected={registerSelected}
                setLoginSelected={setLoginSelected}
                setRegisterSelected={setRegisterSelected}
                setUser={setUser}
                currentUser={currentUser}
              />
            )
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
      <Footer navigate={navigate} />
    </div>
  );
};

export default App;

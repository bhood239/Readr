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

const App = () => {
  const navigate = useNavigate();
  const currentUser = { name: "John Doe", email: "johndoe@example.com" };
  const [user, setUser] = useState(currentUser);
  const [loginSelected, setLoginselected] = useState(false);
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
        setLoginselected={setLoginselected}
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
                setLoginselected={setLoginselected}
                setRegisterSelected={setRegisterSelected}
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

// to include: TopNavBar, Footer, conditionally render: Homepage, Dashboard
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import Homepage from "./routes/Homepage";
import SearchResult from "./components/SearchResults";



const App = () => {
  // Simulate a user object
  const currentUser = { name: "John Doe", email: "johndoe@example.com" };
  const [user, setUser] = useState( {name: "John Doe", email: "johndoe@example.com" });

  const handleLogout = () => {
    // Simulate a user logging out
    setUser(null);
  };

  return (
    <div className="App">
      <TopNavBar
        user={user}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Profile" element={<Profile user={user}/>} />
        <Route path="/Search" element={<SearchResult/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

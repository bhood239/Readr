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

// Define your routes
const routes = {
  dashboard: Dashboard,
  profile: Profile,
  homepage: Homepage,
  search: SearchResult,
};

const App = () => {
  // Simulate a user object
  const currentUser = { name: "John Doe", email: "johndoe@example.com" };
  const [user, setUser] = useState(currentUser);

  const handleLogout = () => {
    // Simulate a user logging out
    setUser(null);
  };

  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState("homepage");

  // Get the current page component
  const CurrentPage = routes[currentPage];

  return (
    <div className="App">
      <TopNavBar
        setCurrentPage={setCurrentPage}
        user={user}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route exact path="/" component={Homepage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/search" component={SearchResult} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

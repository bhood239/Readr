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
import PostForm from "./components/PostForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

const App = () => {
  // Simulate a user object
  const currentUser = { id: 1, name: "User One", email: "userone@example.com", password: "password"};
  const [user, setUser] = useState(currentUser);
  const [selectedBook, setSelectedBook] = useState({id: 1, title:"Book Name", author: "Author Name"})

  const handleLogout = () => {
    // Simulate a user logging out
    setUser(null);
  };

  const handlePostCreation = (newPost) => {
    console.log("New post created: ", newPost);
  }

  return (
    <div className="App">
      <TopNavBar
        user={user}
        handleLogout={handleLogout}

      />
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Search" element={<SearchResult/>} />
      </Routes>

    {user && selectedBook && ( 
      <PostForm onPostCreation={handlePostCreation} user={user.id} selectedBook={selectedBook.id} />

      )}

      <Footer />
    </div>
  );
};

export default App;

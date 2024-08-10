import { useState } from "react";
import BookList from "../components/BookList";
import MiniProfile from "../components/MiniProfile";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import SearchResult from "../components/SearchResults";
import SearchUsers from "../components/SearchUsers";
import "../styles/Dashboard.css";

// children: MiniProfile, PostList, Search results, popular books (booklist), Postform
const Dashboard = (props) => {
  const [selectedView, setSelectedView] = useState("postList");
  const {
    currentUser,
    wantToRead,
    reading,
    read,
    favBooks,
    popularBooks,
    handleCreateFriend,
    handleDeleteFriend,
    handleCreateBookStatus,
    updateBookStatus,
    allBookStatuses,
    addPost,
    postFormSelected,
    setPostFormSelected,
    postFormBookId,
    onPostCreation,
    posts,
    loading,
    error,
    onEdit,
    onDelete,
    existingPost
  } = props;

  const renderContent = () => {
    if (postFormSelected) {
      return (
        <PostForm
          currentUser={currentUser.id}
          post={existingPost} // If editing, pass the existing post
          bookId={postFormBookId} // Pass the correct bookId
          onPostCreation={onPostCreation}
          setPostFormSelected={setPostFormSelected}
        />
      );
    }

    switch (selectedView) {
      case "postList":
        return <PostList currentUser={currentUser} 
        posts={posts} 
        loading={loading} 
        error={error} 
        onEdit={onEdit}
        onDelete={onDelete}
        />;
      case "searchResults":
        return (
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
        );
      case "postForm":
        return <PostForm
        currentUser={currentUser.id}
        bookId={postFormBookId}
        post={existingPost} 
        onPostCreation={onPostCreation}
        setPostFormSelected={setPostFormSelected} 
        />;
      case "findPeople":
        return (
          <SearchUsers
            currentUser={currentUser}
            handleCreateFriend={handleCreateFriend}
            handleDeleteFriend={handleDeleteFriend}
          />
        );
      case "popularBooks":
        return (
          <BookList
            books={popularBooks}
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
        );
      default:
        return <PostList 
        currentUser={currentUser} 
        posts={posts} 
        loading={loading} 
        error={error} 
        onEdit={onEdit}
        onDelete={onDelete}
        />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="row">
        {/* MiniProfile on the left */}
        <div className="mini-profile">
          <MiniProfile
            currentUser={currentUser}
            wantToRead={wantToRead}
            reading={reading}
            read={read}
            favBooks={favBooks}
            handleCreateFriend={handleCreateFriend}
            handleDeleteFriend={handleDeleteFriend}
          />
        </div>

        {/* Main content in the center */}
        <div className="main-content">
          <div className="dashboard-header">
            <h1>Hello Dashboard</h1>
          </div>
          <div className="dashboard-buttons">
            <button
              className="dashboard-btn"
              onClick={() => setSelectedView("postList")}
            >
              Post List
            </button>
            <button
              className="dashboard-btn"
              onClick={() => setSelectedView("searchResults")}
            >
              Search Books
            </button>
            <button
              className="dashboard-btn"
              onClick={() => setSelectedView("postForm")}
            >
              Post Form
            </button>
          </div>
          {renderContent()}
        </div>

        {/* FindPeople and PopularBooks on the right */}
        <div className="right-sidebar">
          <button
            className="dashboard-btn"
            onClick={() => setSelectedView("popularBooks")}
          >
            Popular Books
          </button>
          <button
            className="dashboard-btn"
            onClick={() => setSelectedView("findPeople")}
          >
            Find People
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

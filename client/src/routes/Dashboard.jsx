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
    setSelectedUser,
    wantToRead,
    setWantToRead,
    setReading,
    setRead,
    setFavBooks,
    setPopularBooks,
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
    fetchAllBooksDetails,
    posts,
    loading,
    error,
    onDelete,
    onPostCreation,
    setPostFormSelected,
    postFormBookId,
    existingPost
  } = props;

  const renderContent = () => {
    // if (postFormSelected) {
    //   return (
    //     <PostForm
    //       currentUser={currentUser.id}
    //       post={existingPost} // If editing, pass the existing post
    //       bookId={postFormBookId} // Pass the correct bookId
    //       onPostCreation={onPostCreation}
    //       setPostFormSelected={setPostFormSelected}
    //       onDelete={onDelete}
    //     />
    //   );
    // }

    switch (selectedView) {
      case "postList":
        return <PostList currentUser={currentUser} 
        posts={posts} 
        loading={loading} 
        error={error} 
        onDelete={onDelete}
    
        />;
      case "searchResults":
        return (
          <SearchResult
            currentUser={currentUser}
            wantToRead={wantToRead}
            setWantToRead={setWantToRead}
            setReading={setReading}
            setRead={setRead}
            setFavBooks={setFavBooks}
            reading={reading}
            read={read}
            favBooks={favBooks}
            handleCreateBookStatus={handleCreateBookStatus}
            updateBookStatus={updateBookStatus}
            allBookStatuses={allBookStatuses}
            addPost={addPost}
            fetchAllBooksDetails={fetchAllBooksDetails}
            postFormSelected={postFormSelected}
            setPostFormSelected={setPostFormSelected}
            postFormBookId={postFormBookId}
            onPostCreation={onPostCreation}
            posts={posts}
            existingPost={existingPost}
          />
        );

      case "popularBooks":
        return (
          <BookList
            books={popularBooks}
            currentUser={currentUser}
            wantToRead={wantToRead}
            setWantToRead={setWantToRead}
            setReading={setReading}
            setRead={setRead}
            setFavBooks={setFavBooks}
            reading={reading}
            read={read}
            favBooks={favBooks}
            handleCreateBookStatus={handleCreateBookStatus}
            updateBookStatus={updateBookStatus}
            allBookStatuses={allBookStatuses}
            addPost={addPost}
            fetchAllBooksDetails={fetchAllBooksDetails}
            postFormSelected={postFormSelected}
            setPostFormSelected={setPostFormSelected}
            postFormBookId={postFormBookId}
            onPostCreation={onPostCreation}
            posts={posts}
            existingPost={existingPost}
          />
        );
      default:
        return <PostList 
        currentUser={currentUser} 
        posts={posts} 
        loading={loading} 
        error={error} 
        
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
          <div className="dashboard-buttons">
            <button
              className="dashboard-btn"
              onClick={() => setSelectedView("postList")}
            >
              Posts
            </button>
            <button
              className="dashboard-btn"
              onClick={() => setSelectedView("searchResults")}
            >
              Search Books
            </button>
          <button
            className="dashboard-btn"
            onClick={() => setSelectedView("popularBooks")}
          >
            Popular Books
          </button>
          </div>
          {renderContent()}
        </div>

        {/* FindPeople and PopularBooks on the right */}
        <div className="right-sidebar">
          <div
            className="card-title"
          >
            Find People
          <SearchUsers
            currentUser={currentUser}
            setSelectedUser={setSelectedUser}
            handleCreateFriend={handleCreateFriend}
            handleDeleteFriend={handleDeleteFriend}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

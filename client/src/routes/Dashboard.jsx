import { useState } from "react";
import BookList from "../components/BookList";
import MiniProfile from "../components/MiniProfile";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import SearchResult from "../components/SearchResults";
import SearchUsers from "../components/SearchUsers";
import '../components/PostForm.scss'
import '../styles/Dashboard.css'

// children: MiniProfile, PostList, Search results, popular books (booklist), Postform
const Dashboard = (props) => {
    const [selectedView, setSelectedView] = useState('postList');
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
        posts
    } = props;

    const renderContent = () => {
        if (postFormSelected) {
            return (
                <PostForm
                    currentUser={currentUser.id}
                    postFormBookId={postFormBookId}
                    onPostCreation={onPostCreation}
                    setPostFormSelected={setPostFormSelected}
                />

                
            );
        }

        switch (selectedView) {
            case 'postList':
                return <PostList posts={posts} />;
            case 'searchResults':
                return <SearchResult
                    currentUser={currentUser}
                    wantToRead={wantToRead}
                    reading={reading}
                    read={read}
                    favBooks={favBooks}
                    handleCreateBookStatus={handleCreateBookStatus}
                    updateBookStatus={updateBookStatus}
                    allBookStatuses={allBookStatuses}
                    addPost={addPost} />;
            case 'postForm':
                return <PostForm />;
            case 'findPeople':
                return <SearchUsers
                    currentUser={currentUser}
                    handleCreateFriend={handleCreateFriend}
                    handleDeleteFriend={handleDeleteFriend} />;
            case 'popularBooks':
                return <BookList
                    books={popularBooks}
                    currentUser={currentUser}
                    wantToRead={wantToRead}
                    reading={reading}
                    read={read}
                    favBooks={favBooks}
                    handleCreateBookStatus={handleCreateBookStatus}
                    updateBookStatus={updateBookStatus}
                    allBookStatuses={allBookStatuses}
                    addPost={addPost} />;
            default:
                return <PostList posts={posts} />;
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
                        <button className="btn btn-primary me-2" onClick={() => setSelectedView('postList')}>Post List</button>
                        <button className="btn btn-primary me-2" onClick={() => setSelectedView('searchResults')}>Search Books</button>
                        <button className="btn btn-primary" onClick={() => setSelectedView('postForm')}>Post Form</button>
                    </div>
                    {renderContent()}
                </div>

                {/* FindPeople and PopularBooks on the right */}
                <div className="right-sidebar">
                    <button className="btn btn-primary" onClick={() => setSelectedView('popularBooks')}>Popular Books</button>
                    <button className="btn btn-primary" onClick={() => setSelectedView('findPeople')}>Find People</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

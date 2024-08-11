import React, { useEffect, useState } from "react";
import BookList from "./BookList";
import { useBooksByName } from "../helpers/hooks/useBookData";
import "../styles/Search.css";

const SearchResult = (props) => {
  const {
    currentUser,
    wantToRead,
    reading,
    read,
    favBooks,
    handleCreateBookStatus,
    updateBookStatus,
    allBookStatuses,
    fetchAllBooksDetails,
    setWantToRead,
    setReading,
    setRead,
    setFavBooks,
    addPost
  } = props;
  // searchData is the data returned from api
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { books, loading, error } = useBooksByName(searchResults);

  useEffect(() => {
    if (books) {
      setSearchData(books);
    }
  }, [books]);

  const handleClick = () => {
    setSearchResults(searchText);
  };

  return (
    <div className="search-container">
      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          className="search-input" // Apply the CSS class
        />
        <button onClick={handleClick} className="search-button">
          Search
        </button>{" "}
        {/* Apply the CSS class */}
      </div>
      <div className="search-results">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {searchData.length > 0 && (
          <BookList
            books={searchData}
            loading={loading}
            error={error}
            currentUser={currentUser}
            wantToRead={wantToRead}
            reading={reading}
            read={read}
            favBooks={favBooks}
            handleCreateBookStatus={handleCreateBookStatus}
            updateBookStatus={updateBookStatus}
            allBookStatuses={allBookStatuses}
            fetchAllBooksDetails={fetchAllBooksDetails}
            setWantToRead={setWantToRead}
            setReading={setReading}
            setRead={setRead}
            setFavBooks={setFavBooks}
            addPost={addPost}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResult;

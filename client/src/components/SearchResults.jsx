
import React, { useEffect, useState } from "react";
import BookList from "./BookList";
import { useBooksByName } from "../helpers/hooks/useBookData";

const SearchResult = (props) => {
  const { currentUser } = props;
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
    <div>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
        />
        <button onClick={handleClick}>Search</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {searchData.length > 0 && <BookList books={searchData} currentUser={currentUser} />}
    </div>
  );
};

export default SearchResult;

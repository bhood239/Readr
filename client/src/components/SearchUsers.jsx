
import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { useUsersByName } from "../helpers/hooks/apiData/useUserData";
import '../styles/Search.css'

const SearchUsers = (props) => {
  const { currentUser, handleCreateFriend, handleDeleteFriend } = props;
  // searchData is the data returned from api
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { users, loading, error } = useUsersByName(searchResults);

  useEffect(() => {
    if (users) {
      setSearchData(users);
    }
  }, [users]);

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
          placeholder="Search User"
          className="search-input"
        />
        <button onClick={handleClick} className="search-button">Search</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {searchData.length > 0 && <UserList users={searchData} currentUser={currentUser} handleCreateFriend={handleCreateFriend} handleDeleteFriend={handleDeleteFriend} />}
    </div>
  );
};

export default SearchUsers;

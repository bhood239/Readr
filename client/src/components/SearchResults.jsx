import { useState } from "react";
import BookList from "./BookList";

const SearchResult = (props) => {
    const { searchText, setSearchText, searchData } = props;
    // searchData is the data returned from api
    const [searchResult, setSearchResult] = useState([]);

    const handleClick = () => {
        setSearchResult(searchData);
    };

    return(
        <div>
            <div>
                <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search" />
                <button onClick={() => handleClick()}>Search</button>
            </div>
            
            <BookList books={searchResult} />
        </div>
    );
};

export default SearchResult;
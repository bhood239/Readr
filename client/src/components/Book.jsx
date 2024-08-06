import { useState } from "react";
import "../styles/Book.css";

// individual book view
const Book = (props) => {
  const {
    book,
    favBooks,
    addWantToRead,
    addReading,
    addRead,
    removeStatus,
    addFav,
    removeFav,
  } = props;
  // addWantToRead, addReading, addRead, addFav etc are functions to add, update or remove data
  // avgTimeSpent and avgRating are the functions that take book_id and return data

  const isFavourite = favBooks.includes(book.id);
  const [status, setStatus] = useState("select");

  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  const handleClick = () => {
    if (status === "wantToRead") {
      addWantToRead(book);
    } else if (status === "reading") {
      addReading(book);
    } else if (status === "read") {
      addRead(book);
    } else if (status === "select") {
      removeStatus(book);
    }
  };

  return (
    <div className="book-container">
      {/* img src comes from props */}
      <img className="book_cover" src={book.cover} alt={book.title} />
      <div className="book-details">
        <div className="book-info">
          <div className="book-title">{book.title}</div> {/* Book Name */}
          <div className="book-author">{book.author}</div> {/* Author Name */}
        </div>
        {/* <div>
                        <span>{avgRating(book.id)}</span>
                        <span>{avgTimeSpent(book.id)}</span> 
                    </div> */}
        <div className="book-actions">
          {isFavourite ? (
            <button onClick={() => removeFav(book.id)}>
              Remove From My Books
            </button>
          ) : (
            <button onClick={() => addFav(book.id)}>Add To My Books</button>
          )}
          <div>
            <select value={status} onChange={handleChange}>
              <option value="select">Select</option>
              <option value="wantToRead">Want To Read</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </select>
            <button onClick={handleClick}>✅</button>
          </div>
        </div>
        <div>
          {/* <button onClick={() => addPost(book.id)}>Edit</button> */}
        </div>
      </div>
    </div>
  );
};

export default Book;

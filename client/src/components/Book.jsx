import { useEffect, useState } from "react";
import '../styles/Book.css'
import { useBookStatusByUserAndBook } from "../helpers/hooks/apiData/useBookStatusdata";

// individual book view
const Book = (props) => {
    const {
        book,
        currentUser,
        favBooks,
        wantToRead,
        reading,
        read,
        addWantToRead,
        addReading,
        addRead,
        removeStatus,
        addFav,
        removeFav,
        addPost
    } = props;
    // addWantToRead, addReading, addRead, addFav etc are functions to add, update or remove data
    // avgTimeSpent and avgRating are the functions that take book_id and return data
    const { bookStatus, loading, error } = useBookStatusByUserAndBook(currentUser, currentUser.id, book.id);
    const [status, setStatus] = useState('select');
    const [buttonStates, setButtonStates] = useState({
        fav: null,
        status: 'select'
    });

    useEffect(() => {
        if (bookStatus) {
            setStatus(bookStatus.status || 'select');
            updateButtonState('status', bookStatus.status || 'select');
        }
    }, [bookStatus]);

    useEffect(() => {
        const isFavourite = favBooks.some(favBook => favBook?.id === book.id);
        updateButtonState('fav', isFavourite ? 'Remove From My Books' : 'Add To My Books');
    }, [favBooks, book.id]);

    const updateButtonState = (type, action) => {
        setButtonStates(prevState => ({
            ...prevState,
            [type]: action
        }));
    };

    const handleChange = (e) => {
        updateButtonState('status', e.target.value);
    };

    const handleClick = () => {
        switch (bookStatusText) {
            case 'to_read':
                addWantToRead(book);
                break;
            case 'reading':
                addReading(book);
                break;
            case 'read':
                addRead(book);
                break;
            case 'select':
                removeStatus(book);
                break;
            default:
                break;
        }
    };

    const handleFavClick = () => {
        if (buttonStates.fav === 'Add To My Books') {
            addFav(book.id);
            updateButtonState('fav', 'Remove From My Books');
        } else {
            removeFav(book.id);
            updateButtonState('fav', 'Add To My Books');
        }
    };

    const favButtonText = buttonStates.fav;
    const bookStatusText = buttonStates.status;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="book-container">
            {/* img src comes from props */}
            <img className="book_cover" src={book.cover} alt={book.title} />
            <div className="book-details">
                <div className="book-info">
                    <div className="book-title">{book.title}</div>
                    <div className="book-author">{book.author}</div>
                </div>
                {/* <div>
                        <span>{avgRating(book.id)}</span>
                        <span>{avgTimeSpent(book.id)}</span> 
                    </div> */}
                <div className="book-actions">
                    <button onClick={handleFavClick}>
                        {favButtonText}
                    </button>
                    <div>
                        <select value={bookStatusText} onChange={handleChange}>
                            <option value="select">Select</option>
                            <option value="to_read">Want To Read</option>
                            <option value="reading">Reading</option>
                            <option value="read">Read</option>
                        </select>
                        <button onClick={handleClick}>Add</button>
                    </div>
                </div>
                <div>
                    <button onClick={() => addPost(book.id)}>Review</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;

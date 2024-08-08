// mapped list of books
import { useCallback, useEffect, useState } from "react";
import '../styles/BookList.css'
import Book from "./Book"

const BookList = (props) => {
    // const { books, favBooks, addWantToRead, addReading, addRead, addFav, removeFav, addPost, avgTimeSpent, avgRating } = props;
    const { 
        books, 
        loading,
        error,
        currentUser, 
        wantToRead, 
        reading, 
        read, 
        favBooks, 
        handleCreateBookStatus, 
        updateBookStatus, 
        allBookStatuses, 
        addPost 
    } = props;

    const [bookStatuses, setBookStatuses] = useState({});

    useEffect(() => {
        if (allBookStatuses) {
            // Filter statuses for the current user
            const userStatuses = allBookStatuses.filter(status => status.user_id === currentUser.id);
            const statusesMap = userStatuses.reduce((acc, status) => {
                acc[status.book_id] = status;
                return acc;
            }, {});
            setBookStatuses(statusesMap);
        }
    }, [allBookStatuses, currentUser]);

    const updateBookStatusHandler = useCallback(async (bookId, statusData) => {
        const bookStatus = bookStatuses[bookId];
        try {
            if (bookStatus) {
                await updateBookStatus(currentUser.id, bookId, statusData);
            } else {
                await handleCreateBookStatus({ user_id: currentUser.id, book_id: bookId, ...statusData });
            }
            setBookStatuses(prevStatuses => ({
                ...prevStatuses,
                [bookId]: { ...prevStatuses[bookId], ...statusData }
            }));
        } catch (error) {
            console.error("Failed to update book status:", error);
        }
    }, [bookStatuses, currentUser.id, handleCreateBookStatus, updateBookStatus]);

    const addFav = (bookId) => updateBookStatusHandler(bookId, { fave_books: true });
    const removeFav = (bookId) => updateBookStatusHandler(bookId, { fave_books: false });
    const addWantToRead = (book) => updateBookStatusHandler(book.id, { status: 'to_read' });
    const addReading = (book) => updateBookStatusHandler(book.id, { status: 'reading' });
    const addRead = (book) => updateBookStatusHandler(book.id, { status: 'read' });
    const removeStatus = (book) => updateBookStatusHandler(book.id, { status: null });

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            <ul className="book-list">
                {books && books.map((book) => (
                    <li key={book.id} className="book-list-item">
                        <Book
                            book={book}
                            currentUser={currentUser}
                            wantToRead={wantToRead}
                            reading={reading}
                            read={read}
                            favBooks={favBooks}
                            bookStatus={bookStatuses[book.id] || {}}
                            addWantToRead={addWantToRead}
                            addReading={addReading}
                            addRead={addRead}
                            removeStatus={removeStatus}
                            addFav={addFav}
                            removeFav={removeFav}
                            addPost={addPost}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
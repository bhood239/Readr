// mapped list of books
import { useEffect, useState } from "react";
import Book from "./Book"

const BookList = (props) => {
    // const { books, favBooks, addWantToRead, addReading, addRead, addFav, removeFav, addPost, avgTimeSpent, avgRating } = props;
    const { books, currentUser, wantToRead, reading, read, favBooks, handleCreateBookStatus, updateBookStatus, allBookStatuses } = props;

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

    const updateBookStatusHandler = async (bookId, statusData) => {
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
    };

    const addFav = (book) => updateBookStatusHandler(book.id, { fave_books: true });
    const removeFav = (book) => updateBookStatusHandler(book.id, { fave_books: false });
    const addWantToRead = (book) => updateBookStatusHandler(book.id, { status: 'to_read' });
    const addReading = (book) => updateBookStatusHandler(book.id, { status: 'reading' });
    const addRead = (book) => updateBookStatusHandler(book.id, { status: 'read' });
    const removeStatus = (book) => updateBookStatusHandler(book.id, { status: null });

    return (
        <ul>
            {books && books.map((book) => (
                <Book 
                key={book.id}
                book={book}
                favBooks={favBooks}
                addWantToRead={addWantToRead}
                addReading={addReading}
                addRead={addRead}
                removeStatus={removeStatus}
                addFav={addFav}
                removeFav={removeFav}
                // addPost={addPost}
                // avgTimeSpent={avgTimeSpent}
                // avgRating={avgRating}
                 />
            ))}
        </ul>
    );
};

export default BookList;
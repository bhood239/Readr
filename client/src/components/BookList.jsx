// mapped list of books
import { useEffect, useState } from "react";
import {
    useCreateBookStatus,
    useBookStatusByUserAndBook,
    useAllBookStatuses,
    useUpdateBookStatusByUserAndBook,
    useDeleteBookStatusByUserAndBook,
  } from "../helpers/hooks/apiData/useBookStatusdata";
import Book from "./Book"

const BookList = (props) => {
    // const { books, favBooks, addWantToRead, addReading, addRead, addFav, removeFav, addPost, avgTimeSpent, avgRating } = props;
    const { books, currentUser } = props;
    const [bookStatuses, setBookStatuses] = useState({});
    const [favBooks, setFavBooks] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [reading, setReading] = useState([]);
    const [read, setRead] = useState([]);

    const { handleCreateBookStatus } = useCreateBookStatus();
    const { updateBookStatus } = useUpdateBookStatusByUserAndBook();
    const { bookStatuses: allBookStatuses, loading, error } = useAllBookStatuses();

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
    }, [allBookStatuses, currentUser.id]);

    const updateBookStatusHandler = async (bookId, statusData) => {
        const bookStatus = bookStatuses[bookId];
        if (bookStatus) {
            await updateBookStatus(currentUser.id, bookId, statusData);
        } else {
            await handleCreateBookStatus({ user_id: currentUser.id, book_id: bookId, ...statusData });
        }
        // Optionally update the local state to reflect the change
        setBookStatuses(prevStatuses => ({
            ...prevStatuses,
            [bookId]: { ...prevStatuses[bookId], ...statusData }
        }));
        // setBookStatuses(statusesMap);
    };

    const addFav = (book) => {
        updateBookStatusHandler(book.id, { favBook: true });
    };

    const removeFav = (book) => {
        updateBookStatusHandler(book.id, { favBook: false });
    };

    const addWantToRead = (book) => {
        updateBookStatusHandler(book.id, { status: 'to_read' });
    };

    const addReading = (book) => {
        updateBookStatusHandler(book.id, { status: 'reading' });
    };

    const addRead = (book) => {
        updateBookStatusHandler(book.id, { status: 'read' });
    };

    const removeStatus = (book) => {
        updateBookStatusHandler(book.id, { status: null })
    };

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
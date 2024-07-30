// mapped list of books
import { useEffect, useState } from "react";
import {
    useCreateBookStatus,
    useBookStatusById,
    useAllBookStatuses,
    useUpdateBookStatusById,
    useDeleteBookStatusById,
  } from "../helpers/hooks/useApiData/useBookStatusData";
import Book from "./Book"

const BookList = (props) => {
    // const { books, favBooks, addWantToRead, addReading, addRead, addFav, removeFav, addPost, avgTimeSpent, avgRating } = props;
    const { books } = props;
    const [favBooks, setFavBooks] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [reading, setReading] = useState([]);
    const [read, setRead] = useState([]);


    const updateBookStatus = (bookId, status) => {
        const bookStatus = useBookStatusById(bookId);
        if (bookStatus) {
            useUpdateBookStatusById(bookId, status);
        } else {
            useCreateBookStatus(bookId, status);
        }
    };

    const addFav = (book) => {
        updateBookStatus(book.id, { favBook: true });
    };

    const removeFav = (book) => {
        useUpdateBookStatusById(book.id, { favBook: false });
    };

    const addWantToRead = (book) => {
        updateBookStatus(book.id, { status: 'to_read' });
    };

    const addReading = (book) => {
        updateBookStatus(book.id, { status: 'reading' });
    };

    const addRead = (book) => {
        updateBookStatus(book.id, { status: 'read' });
    };

    const removeStatus = (book) => {
        updateBookStatus(book.id, { status: null })
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
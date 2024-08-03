import { useEffect, useState } from "react";
import { useBooksByUserAndStatus, useFavoriteBooksByUser } from "./useBookStatusdata"
import { getBookById } from "../../apiRequests/bookApi/bookApiRequests";

// in-app states
// states for toRead, reading, read and favBooks (array of book details objects)
// loadProfile (function to render profile on App.jsx) -> This may go in App.jsx
// functions for books - addWantToRead, addReading, addRead, addFav, removeFav
// functions for post - addPost, removePost
// functions for HomePage - login, signup, logout
// states for SearchResults - searchText
// function for SearchResults - searchData -> returns search result based on searchText
// states for loginForm - email, password
// function for loginForm - login

//   states for bookStates
const useUserBooks = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [wantToRead, setWantToRead] = useState([]);
    const [reading, setReading] = useState([]);
    const [read, setRead] = useState([]);
    const [favBooks, setFavBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    const {
        books: toReadBookIds,
        loading: toReadLoading,
        error: toReadError,
    } = useBooksByUserAndStatus(currentUser?.id, 'to_read');

    const {
        books: readingBookIds,
        loading: readingLoading,
        error: readingError,
    } = useBooksByUserAndStatus(currentUser?.id, 'reading');

    const {
        books: readBookIds,
        loading: readLoading,
        error: readError,
    } = useBooksByUserAndStatus(currentUser?.id, 'read');

    const {
        books: favBookIds,
        loading: favBookLoading,
        error: favBookError,
    } = useFavoriteBooksByUser(currentUser?.id);

    useEffect(() => {
        if (!currentUser) return;

        const fetchBooksDetails = async (bookIds, setter) => {
            setLoading(true);
            try {
                const booksDetails = await Promise.all(
                    bookIds.map(async (bookId) => {
                        const book = await getBookById(bookId);
                        console.log('book:', book);
                        return book;
                    })
                );
                setter(booksDetails);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (toReadBookIds.length) fetchBooksDetails(toReadBookIds, setWantToRead);
        if (readingBookIds.length) fetchBooksDetails(readingBookIds, setReading);
        if (readBookIds.length) fetchBooksDetails(readBookIds, setRead);
        if (favBookIds.length) fetchBooksDetails(favBookIds, setFavBooks);
    }, [currentUser, toReadBookIds, readingBookIds, readBookIds, favBookIds]);

    return {
        currentUser,
        setCurrentUser,
        wantToRead,
        reading,
        read,
        favBooks,
        loading: toReadLoading || readingLoading || readLoading || favBookLoading,
        errors: {
            toReadError,
            readingError,
            readError,
            favBookError
        }
    };
};

export default useUserBooks;
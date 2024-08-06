import { useEffect, useState } from "react";
import { useBooksByUserAndStatus, useFavoriteBooksByUser, usePopularBooks } from "./useBookStatusdata"
import { getBookById } from "../../apiRequests/bookApi/bookApiRequests";

//   states for bookStates
const useUserBooks = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [wantToRead, setWantToRead] = useState([]);
    const [reading, setReading] = useState([]);
    const [read, setRead] = useState([]);
    const [favBooks, setFavBooks] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);

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

    const {
        books: popularBookIds,
        loading: popularBookLoading,
        error: popularBookError,
    } = usePopularBooks();

    useEffect(() => {
        if (!currentUser) return;

        const fetchBooksDetails = async (bookIds, setter) => {
            setLoading(true);
            try {
                const booksDetails = await Promise.all(
                    bookIds.map(async (bookId) => {
                        const book = await getBookById(bookId);
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
        if (popularBookIds.length) fetchBooksDetails(popularBookIds, setPopularBooks);
    }, [toReadBookIds, readingBookIds, readBookIds, favBookIds, popularBookIds]);

    useEffect(() => {
        // Trigger fetching when currentUser is set
        if (currentUser) {
            setLoading(true); // Set loading to true when currentUser changes
        }
    }, [currentUser]);

    return {
        currentUser,
        setCurrentUser,
        wantToRead,
        reading,
        read,
        favBooks,
        popularBooks,
        loading: toReadLoading || readingLoading || readLoading || favBookLoading || popularBookLoading,
        errors: {
            toReadError,
            readingError,
            readError,
            favBookError,
            popularBookError
        }
    };
};

export default useUserBooks;
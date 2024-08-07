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
    } = useBooksByUserAndStatus(currentUser, currentUser?.id, 'to_read');

    const {
        books: readingBookIds,
        loading: readingLoading,
        error: readingError,
    } = useBooksByUserAndStatus(currentUser, currentUser?.id, 'reading');

    const {
        books: readBookIds,
        loading: readLoading,
        error: readError,
    } = useBooksByUserAndStatus(currentUser, currentUser?.id, 'read');

    const {
        books: favBookIds,
        loading: favBookLoading,
        error: favBookError,
    } = useFavoriteBooksByUser(currentUser, currentUser?.id);

    const {
        books: popularBookIds,
        loading: popularBookLoading,
        error: popularBookError,
    } = usePopularBooks(currentUser);

    useEffect(() => {
        if (!currentUser) return;

        const fetchBooksDetails = async (bookIds, setter) => {
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
            }
        };

        setLoading(true);
        if (toReadBookIds.length) fetchBooksDetails(toReadBookIds, setWantToRead);
        if (readingBookIds.length) fetchBooksDetails(readingBookIds, setReading);
        if (readBookIds.length) fetchBooksDetails(readBookIds, setRead);
        if (favBookIds.length) fetchBooksDetails(favBookIds, setFavBooks);
        if (popularBookIds.length) fetchBooksDetails(popularBookIds, setPopularBooks);
        setLoading(false);
    }, [currentUser, toReadBookIds, readingBookIds, readBookIds, favBookIds, popularBookIds]);


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
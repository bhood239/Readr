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

        let isMounted = true;

        const fetchBooksDetails = async (bookIds, setter) => {
            try {
                const booksDetails = await Promise.all(
                    bookIds.map(async (bookId) => {
                        const book = await getBookById(bookId);
                        return book;
                    })
                );
                if (isMounted) setter(booksDetails);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchAllBooksDetails = async () => {
            setLoading(true);

            // Fetch data in parallel
            await Promise.all([
                toReadBookIds.length ? fetchBooksDetails(toReadBookIds, setWantToRead) : Promise.resolve(),
                readingBookIds.length ? fetchBooksDetails(readingBookIds, setReading) : Promise.resolve(),
                readBookIds.length ? fetchBooksDetails(readBookIds, setRead) : Promise.resolve(),
                favBookIds.length ? fetchBooksDetails(favBookIds, setFavBooks) : Promise.resolve(),
                popularBookIds.length ? fetchBooksDetails(popularBookIds, setPopularBooks) : Promise.resolve(),
            ]);

            setLoading(false);
        };
        fetchAllBooksDetails();

        return () => {
            isMounted = false; // Cleanup flag when component unmounts
        };
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
import { useEffect, useState } from "react";
import { useAllBookStatuses, useBooksByUserAndStatus, useFavoriteBooksByUser, usePopularBooks } from "./useBookStatusdata"
import { getBookById } from "../../apiRequests/bookApi/bookApiRequests";

//   states for bookStates
const useUserBooks = (selectedUser) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [wantToRead, setWantToRead] = useState([]);
    const [reading, setReading] = useState([]);
    const [read, setRead] = useState([]);
    const [favBooks, setFavBooks] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    const user = selectedUser || currentUser;

    const {
        books: toReadBookIds,
        loading: toReadLoading,
        error: toReadError,
    } = useBooksByUserAndStatus(currentUser, user?.id, 'to_read');

    const {
        books: readingBookIds,
        loading: readingLoading,
        error: readingError,
    } = useBooksByUserAndStatus(currentUser, user?.id, 'reading');

    const {
        books: readBookIds,
        loading: readLoading,
        error: readError,
    } = useBooksByUserAndStatus(currentUser, user?.id, 'read');

    const {
        books: favBookIds,
        loading: favBookLoading,
        error: favBookError,
    } = useFavoriteBooksByUser(currentUser, user?.id);

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
                if (bookIds.length === 0) {
                    if (isMounted) setter([]);
                    return;
                }

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
                fetchBooksDetails(toReadBookIds, setWantToRead),
                fetchBooksDetails(readingBookIds, setReading),
                fetchBooksDetails(readBookIds, setRead),
                fetchBooksDetails(favBookIds, setFavBooks),
                fetchBooksDetails(popularBookIds, setPopularBooks),
            ]);

            setLoading(false);
        };
        fetchAllBooksDetails();

        return () => {
            isMounted = false; // Cleanup flag when component unmounts
        };
    }, [user, currentUser, toReadBookIds, readingBookIds, readBookIds, favBookIds, popularBookIds]);


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
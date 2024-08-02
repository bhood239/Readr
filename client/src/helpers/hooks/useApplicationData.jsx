import { useBooksByUserAndStatus, useFavoriteBooksByUser } from "./apiData/useBookStatusdata";
import { useBookById } from "./useBookData";

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
    const [wantToRead, setWantToRead] = useState([]);
    const [reading, setReading] = useState([]);
    const [read, setRead] = useState([]);
    const [favBooks, setFavBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    const {
        books: toReadBookIds,
        loading: toReadLoading,
        error: toReadError,
    } = useBooksByUserAndStatus(user.id, 'to_read');

    const {
        books: readingBookIds,
        loading: readingLoading,
        error: readingError,
    } = useBooksByUserAndStatus(user.id, 'reading');

    const {
        books: readBookIds,
        loading: readLoading,
        error: readError,
    } = useBooksByUserAndStatus(user.id, 'read');

    const {
        books: favBookIds,
        loading: favBookLoading,
        error: favBookError,
    } = useFavoriteBooksByUser(user.id);

    useEffect(() => {
        const fetchBooksDetails = async (bookIds, setter) => {
            setLoading(true);
            try {
                const booksDetails = await Promise.all(
                    bookIds.map(async (bookId) => {
                        const { book } = useBookById(bookId);
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
    }, [toReadBookIds, readingBookIds, readBookIds, favBookIds]);

    return {
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
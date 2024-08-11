import { useEffect, useState } from "react";
import {
  useBooksByUserAndStatus,
  useFavoriteBooksByUser,
  usePopularBooks,
} from "./useBookStatusdata";
import { getBookById } from "../../apiRequests/bookApi/bookApiRequests";

//   states for bookStates
const useUserBooks = (currentUser, selectedUser) => {
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
  } = useBooksByUserAndStatus(currentUser, user?.id, "to_read");

  const {
    books: readingBookIds,
    loading: readingLoading,
    error: readingError,
  } = useBooksByUserAndStatus(currentUser, user?.id, "reading");

  const {
    books: readBookIds,
    loading: readLoading,
    error: readError,
  } = useBooksByUserAndStatus(currentUser, user?.id, "read");

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
    try {
      await Promise.all([
        toReadBookIds.length
          ? fetchBooksDetails(toReadBookIds, setWantToRead)
          : Promise.resolve(),
        readingBookIds.length
          ? fetchBooksDetails(readingBookIds, setReading)
          : Promise.resolve(),
        readBookIds.length
          ? fetchBooksDetails(readBookIds, setRead)
          : Promise.resolve(),
        favBookIds.length
          ? fetchBooksDetails(favBookIds, setFavBooks)
          : Promise.resolve(),
        popularBookIds.length
          ? fetchBooksDetails(popularBookIds, setPopularBooks)
          : Promise.resolve(),
      ]);
    } catch (error) {
      console.error(error, "fetchAllBooksDetails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    fetchAllBooksDetails();

    return () => {
      isMounted = false; // Cleanup flag when component unmounts
    };
  }, [
    user,
    currentUser,
    toReadBookIds,
    readingBookIds,
    readBookIds,
    favBookIds,
    popularBookIds,
  ]);

  return {
    wantToRead,
    setWantToRead,
    reading,
    setReading,
    read,
    setRead,
    favBooks,
    setFavBooks,
    popularBooks,
    setPopularBooks,
    loading:
      toReadLoading ||
      readingLoading ||
      readLoading ||
      favBookLoading ||
      popularBookLoading,
    errors: {
      toReadError,
      readingError,
      readError,
      favBookError,
      popularBookError,
    },
    fetchAllBooksDetails,
  };
};

export default useUserBooks;

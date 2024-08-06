import { useEffect, useState } from "react";
import {
    createBookStatus,
    getBookStatusByUserAndBook,
    getAllBookStatuses,
    getBooksByUserAndStatus,
    getFavoriteBooksByUser,
    getPopularBooks,
    updateBookStatusByUserAndBook,
    deleteBookStatusByUserAndBook,
} from "../../apiRequests/backendApi/bookStatusRequests";

// Create Book Status
export const useCreateBookStatus = (currentUser) => {
    const [bookStatus, setBookStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateBookStatus = async (data) => {
        if (!currentUser) return;
        setLoading(true);
        setError(null);
        try {
            const createdBookStatus = await createBookStatus(data);
            setBookStatus(createdBookStatus);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { bookStatus, loading, error, handleCreateBookStatus };
};

// Read Book Status by User and Book
export const useBookStatusByUserAndBook = (currentUser, userId, bookId) => {
    const [books, setBookIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookStatus = async () => {
            if (!currentUser) return;
            try {
                const bookStatusData = await getBookStatusByUserAndBook(userId, bookId);
                console.log('Fetched book status data:', bookStatusData);
                setBookIds(bookStatusData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookStatus();
    }, [userId, bookId]);

    return { books, loading, error };
};

export const useFavoriteBooksByUser = (currentUser, userId) => {
    const [books, setBookIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteBooks = async () => {
            if (!currentUser) return;
            try {
                const bookIdsData = await getFavoriteBooksByUser(userId);
                setBookIds(bookIdsData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFavoriteBooks();
    }, [userId]);

    return { books, loading, error };
};

export const usePopularBooks = (currentUser) => {
    const [books, setBookIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularBooks = async () => {
            if (!currentUser) return;
            try {
                const bookIdsData = await getPopularBooks();
                setBookIds(bookIdsData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPopularBooks();
    }, []);

    return { books, loading, error };
};

// Read All Book Statuses
export const useAllBookStatuses = (currentUser) => {
    const [bookStatuses, setBookStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookStatuses = async () => {
            if (!currentUser) return;
            try {
                const bookStatusData = await getAllBookStatuses();
                setBookStatuses(bookStatusData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookStatuses();
    }, []);

    return { bookStatuses, loading, error };
};

// Read All Books by User and Status
export const useBooksByUserAndStatus = (currentUser, userId, status) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            if (!currentUser) return;
            try {
                const booksData = await getBooksByUserAndStatus(userId, status);
                setBooks(booksData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [userId, status]);

    return { books, loading, error };
};

// Update Book Status by User and Book
export const useUpdateBookStatusByUserAndBook = (currentUser) => {
    const [bookStatus, setBookStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateBookStatus = async (userId, bookId, updatedData) => {
        if (!currentUser) return;
        setLoading(true);
        try {
            const bookStatusData = await updateBookStatusByUserAndBook(userId, bookId, updatedData);
            setBookStatus(bookStatusData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { bookStatus, loading, error, updateBookStatus };
};

// Delete Book Status by User and Book
export const useDeleteBookStatusByUserAndBook = (currentUser) => {
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteBookStatus = async (userId, bookId) => {
        if (!currentUser) return;
        setLoading(true);
        try {
            await deleteBookStatusByUserAndBook(userId, bookId);
            setDeleted(true);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleted, loading, error, deleteBookStatus };
};

export default {
    useCreateBookStatus,
    useBookStatusByUserAndBook,
    useFavoriteBooksByUser,
    useAllBookStatuses,
    useUpdateBookStatusByUserAndBook,
    useDeleteBookStatusByUserAndBook,
};

import { useEffect, useState } from "react";
import {
    createBookStatus,
    getBookStatusByUserAndBook,
    getAllBookStatuses,
    updateBookStatusByUserAndBook,
    deleteBookStatusByUserAndBook,
} from "../../apiRequests/backendApi/bookStatusRequests";

// Create Book Status
export const useCreateBookStatus = () => {
  const [bookStatus, setBookStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateBookStatus = async (data) => {
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
export const useBookStatusByUserAndBook = (userId, bookId) => {
  const [bookStatus, setBookStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookStatus = async () => {
      try {
        const bookStatusData = await getBookStatusByUserAndBook(userId, bookId);
        setBookStatus(bookStatusData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookStatus();
  }, [userId, bookId]);

  return { bookStatus, loading, error };
};

// Read All Book Statuses
export const useAllBookStatuses = () => {
  const [bookStatuses, setBookStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookStatuses = async () => {
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

// Update Book Status by User and Book
export const useUpdateBookStatusByUserAndBook = () => {
  const [bookStatus, setBookStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBookStatus = async (userId, bookId, updatedData) => {
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
export const useDeleteBookStatusByUserAndBook = () => {
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteBookStatus = async (userId, bookId) => {
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
  useAllBookStatuses,
  useUpdateBookStatusByUserAndBook,
  useDeleteBookStatusByUserAndBook,
};

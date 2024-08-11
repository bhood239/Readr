import { useState, useEffect } from "react";
import {
  getBookById,
  getBooksByName,
  getAuthorName,
} from "../apiRequests/bookApi/bookApiRequests";

const useBookById = (id) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      console.log("Fetching book with ID:", id); // Debugging ID
      try {
        const bookData = await getBookById(id);
        if (!bookData) {
          throw new Error("No data received from API");
        }
        console.log("Received bookData:", bookData); // Debugging Data
        setBook(bookData);
      } catch (err) {
        console.error("Fetch error:", err); // Debugging Error
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  return { book, loading, error };
};




const useBooksByName = (name) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBooks = async () => {
        setLoading(true);
      try {
        const bookList = await getBooksByName(name);
        setBooks(bookList);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [name]);

  return { books, loading, error };
};

export { useBookById, useBooksByName };

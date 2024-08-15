import axios from "axios";

// POSTS CRUD

// CREATE
export const createBookStatus = async (params) => {
  try {
    const res = await axios.post(`/api/book_statuses`, params);
    return res.data;
  } catch (err) {
    console.log("error creating book status: ", err.message);
    return null;
  }
};

// READ ONE
export const getBookStatusByUserAndBook = async (userId, bookId) => {
  try {
    const res = await axios.get(`/api/book_statuses/${userId}/${bookId}`);
    return res.data;
  } catch (err) {
    console.log("Error getting book status:", err.message);
    return null;
  }
};

// READ ALL
export const getAllBookStatuses = async () => {
  try {
    const res = await axios.get("/api/book_statuses");
    return res.data;
  } catch (err) {
    console.log("error getting bookStatuses: ", err.message);
    return null;
  }
};

// READ BY USER AND STATUS
export const getBooksByUserAndStatus = async (userId, status) => {
  try {
    const res = await axios.get(
      `/api/book_statuses/user_books/${userId}/${status}`
    );
    return res.data;
  } catch (err) {
    console.error("Error getting books by user and status:", err.message);
    return null;
  }
};

// READ BY USER FAV
export const getFavoriteBooksByUser = async (userId) => {
  try {
    const res = await axios.get(
      `/api/book_statuses/user_books/${userId}/fav_books`
    );
    return res.data;
  } catch (err) {
    console.error("Error getting books by user and status:", err.message);
    return null;
  }
};

// READ POPULAR BOOKS
export const getPopularBooks = async () => {
  try {
    const res = await axios.get(`/api/book_statuses/popular_books`);
    return res.data;
  } catch (err) {
    console.error("Error getting books by user and status:", err.message);
    return null;
  }
};

// UPDATE
export const updateBookStatusByUserAndBook = async (userId, bookId, params) => {
  try {
    const res = await axios.put(
      `/api/book_statuses/${userId}/${bookId}`,
      params
    );
    return res.data;
  } catch (err) {
    console.error("Error updating book status:", err.message);
    return null;
  }
};

// DELETE
export const deleteBookStatusByUserAndBook = async (userId, bookId) => {
  try {
    const res = await axios.delete(`/api/book_statuses/${userId}/${bookId}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting book status:", err.message);
    return null;
  }
};
// eslint-disable-next-line
export default {
  createBookStatus,
  getBookStatusByUserAndBook,
  getAllBookStatuses,
  getBooksByUserAndStatus,
  getFavoriteBooksByUser,
  getPopularBooks,
  updateBookStatusByUserAndBook,
  deleteBookStatusByUserAndBook,
};

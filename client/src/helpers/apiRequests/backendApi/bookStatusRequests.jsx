import axios from "axios";

// POSTS CRUD

// CREATE
export const createBookStatus = async (params) => {
    try {
        const res = await axios.post(`/api/book_statuses`, params);
        console.log("book status created:", res.data);
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
        console.log("Response received:", res.data);
        return res.data;
    } catch (err) {
        console.error("Error getting book status:", err.message);
        return null;
    }
};

// READ ALL
export const getAllBookStatuses = async () => {
    try {
        const res = await axios.get("/api/book_statuses");
        console.log("response received: ", res.data);
        return res.data;
    } catch (err) {
        console.log("error getting bookStatuses: ", err.message);
        return null;
    }
};

// READ BY USER AND STATUS
export const getBooksByUserAndStatus = async (userId, status) => {
    try {
        const res = await axios.get(`/api/book_statuses/user_books/${userId}/${status}`);
        console.log("Response received:", res.data);
        return res.data;
    } catch (err) {
        console.error("Error getting books by user and status:", err.message);
        return null;
    }
};

// READ BY USER FAV
export const getFavoriteBooksByUser = async (userId) => {
    try {
        const res = await axios.get(`/api/book_statuses/user_books/${userId}/fav_books`);
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
        const res = await axios.put(`/api/book_statuses/${userId}/${bookId}`, params);
        console.log("Book status updated:", res.data);
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
        console.log("Book status deleted:", res.data);
        return res.data;
    } catch (err) {
        console.error("Error deleting book status:", err.message);
        return null;
    }
};

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

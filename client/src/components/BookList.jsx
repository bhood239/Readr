// mapped list of books
import { useCallback, useEffect, useState } from "react";
import "../styles/BookList.css";
import Book from "./Book";

const BookList = (props) => {
  // const { books, favBooks, addWantToRead, addReading, addRead, addFav, removeFav, addPost, avgTimeSpent, avgRating } = props;
  const {
    books,
    loading,
    error,
    currentUser,
    wantToRead,
    reading,
    read,
    favBooks,
    handleCreateBookStatus,
    updateBookStatus,
    allBookStatuses,
    addPost,
    fetchAllBooksDetails,
    setWantToRead,
    setReading,
    setRead,
    setFavBooks,
    postFormSelected,
  } = props;

  const [bookStatuses, setBookStatuses] = useState({});

  useEffect(() => {
    if (allBookStatuses) {
      // Filter statuses for the current user
      const userStatuses = allBookStatuses.filter(
        (status) => status.user_id === currentUser.id
      );
      const statusesMap = userStatuses.reduce((acc, status) => {
        acc[status.book_id] = status;
        return acc;
      }, {});
      setBookStatuses(statusesMap);
    }
  }, [allBookStatuses, currentUser]);
  // eslint-disable-next-line
  useEffect(() => {
    fetchAllBooksDetails(); // eslint-disable-next-line
  }, [setWantToRead, setReading, setRead, setFavBooks]);
  // eslint-disable-next-line
  const updateBookStatusHandler = useCallback(
    async (bookId, statusData) => {
      const bookStatus = bookStatuses[bookId];
      try {
        if (bookStatus) {
          await updateBookStatus(currentUser.id, bookId, statusData);
        } else {
          await handleCreateBookStatus({
            user_id: currentUser.id,
            book_id: bookId,
            ...statusData,
          });
        }
        setBookStatuses((prevStatuses) => ({
          ...prevStatuses,
          [bookId]: { ...prevStatuses[bookId], ...statusData },
        }));
      } catch (error) {
        console.error("Failed to update book status:", error);
      }
    }, // eslint-disable-next-line
    [
      wantToRead,
      bookStatuses,
      currentUser.id,
      handleCreateBookStatus,
      updateBookStatus,
      fetchAllBooksDetails,
    ]
  );
  const addFav = (book) => {
    updateBookStatusHandler(book.id, { fave_books: true });
    setFavBooks((prev) => {
      const copy = [...prev, book];
      return copy;
    });
  };
  const removeFav = (book) => {
    updateBookStatusHandler(book.id, { fave_books: false });
    setFavBooks((prev) => {
      const index = prev
        .slice(1)
        .findIndex((favBook) => favBook.id === book.id);

      if (index !== -1) {
        const adjustedIndex = index + 1;
        const updatedFavBooks = [...prev];
        updatedFavBooks.splice(adjustedIndex, 1);
        return updatedFavBooks;
      }
      return prev;
    });
  };

  const addWantToRead = (book) => {
    updateBookStatusHandler(book.id, { status: "to_read" });

    // Update 'Want to Read' books
    setWantToRead((prev) => [...prev, book]);
    console.log("want to read list: ", wantToRead);

    // Update 'Reading' books
    setReading((prev) => {
      console.log("previous reading list: ", prev);
      const updatedList = prev.filter((readBook) => readBook.id !== book.id);
      console.log("updated reading list: ", updatedList);
      return updatedList;
    });

    // Update 'Read' books
    setRead((prev) => {
      console.log("previous read list: ", prev);
      const updatedList = prev.filter((readBook) => readBook.id !== book.id);
      console.log("updated read list: ", updatedList);
      return updatedList;
    });
  };
  const addReading = (book) => {
    updateBookStatusHandler(book.id, { status: "reading" });

    setReading((prev) => [...prev, book]);

    // Update 'Want to read' books
    setWantToRead((prev) => {
      const updatedList = prev.filter((readBook) => readBook.id !== book.id);
      return updatedList;
    });

    // Update 'Read' books
    setRead((prev) => {
      const updatedList = prev.filter((readBook) => readBook.id !== book.id);
      return updatedList;
    });
  };

  const addRead = (book) => {
    updateBookStatusHandler(book.id, { status: "read" });
    setRead((prev) => [...prev, book]);

    // Update 'Reading' books
    setReading((prev) => {
      const updatedList = prev.filter((readBook) => readBook.id !== book.id);
      return updatedList;
    });

    // Update 'Read' books
    setWantToRead((prev) => {
      console.log(prev, "155", book, "book id");
      // eslint-disable-next-line
      const updatedList = prev.filter((readBook) => {
        if (readBook) {
          return readBook.id !== book.id;
        }
      });
      console.log(updatedList);
      return updatedList;
    });
  };

  const removeStatus = (book) => {
    updateBookStatusHandler(book.id, { status: null });
    // Update 'Reading' books
    setReading((prev) => {
      const updatedList = prev.filter((readBook) => readBook.id !== book.id);
      return updatedList;
    });

    // Update 'want to read' books
    setWantToRead((prev) => {
      const updatedList = prev.filter((readBook) => readBook.id !== book.id);
      return updatedList;
    });
    // Update 'Read' books
    setRead((prev) => {
      const updatedList = prev.filter((readBook) => readBook.id !== book.id);
      return updatedList;
    });
  };

  if (loading) {
    return <div className="text-center"> Books Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-danger">
        {" "}
        Error while loading books: {error.message}
      </div>
    );
  }

  return (
    <div>
      <ul className="book-list">
        {books &&
          books.map(
            (book) =>
              book && (
                <li key={book.id} className="book-list-item">
                  <Book
                    book={book}
                    currentUser={currentUser}
                    wantToRead={wantToRead}
                    reading={reading}
                    read={read}
                    favBooks={favBooks}
                    bookStatus={bookStatuses[book.id] || {}}
                    addWantToRead={addWantToRead}
                    addReading={addReading}
                    addRead={addRead}
                    removeStatus={removeStatus}
                    addFav={addFav}
                    removeFav={removeFav}
                    addPost={addPost}
                    postFormSelected={postFormSelected}
                  />
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default BookList;

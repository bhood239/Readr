// mapped list of books
import { useEffect, useState } from "react";
import Book from "./Book"

const BookList = (props) => {
    // const { books, favBooks, addWantToRead, addReading, addRead, addFav, removeFav, addPost, avgTimeSpent, avgRating } = props;
    const [books, setBooks] = useState([]);
    const [favBooks, setFavBooks] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [reading, setReading] = useState([]);
    const [read, setRead] = useState([]);

    useEffect(() => {
        fetch(`/api/books`)
        .then(res => res.json())
        .then(data => {
            setBooks(data)
        })
        .catch(error => console.error('Error fetching books:', error));
    }, []);

    useEffect(() => {
        // how should i update book status in the back end

    }, [favBooks, wantToRead, reading, read]);

    const addFav = (book) => {
        setFavBooks(prev => [...prev, book]);
    };

    const removeFav = (book) => {
        setFavBooks(prev => prev.filter(favBook => favBook.id !== book.id));
    };

    // adds book to its state and removes the book from other state
    const addWantToRead = (book) => {
        setWantToRead(prev => [...prev, book]);
        setReading(prev => prev.filter(readingBook => readingBook.id !== book.id));
        setRead(prev => prev.filter(readBook => readBook.id !== book.id));
    };

    const addReading = (book) => {
        setReading(prev => [...prev, book]);
        setRead(prev => prev.filter(readBook => readBook.id !== book.id));
        setWantToRead(prev => prev.filter(wantToReadBook => wantToReadBook.id !== book.id));
    };

    const addRead = (book) => {
        setRead(prev => [...prev, book]);
        setWantToRead(prev => prev.filter(wantToReadBook => wantToReadBook.id !== book.id));
        setReading(prev => prev.filter(readingBook => readingBook.id !== book.id));
    };

    return (
        <ul>
            {books && books.map((book) => (
                <Book 
                key={book.id}
                book={book}
                favBooks={favBooks}
                addWantToRead={addWantToRead}
                addReading={addReading}
                addRead={addRead}
                addFav={addFav}
                removeFav={removeFav}
                addPost={addPost}
                avgTimeSpent={avgTimeSpent}
                avgRating={avgRating} />
            ))}
        </ul>
    );
};

export default BookList;
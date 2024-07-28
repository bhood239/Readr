// mapped list of books
import Book from "./Book"

const BookList = (props) => {
    const { books, favBooks, addWantToRead, addReading, addRead, addFav, removeFav, addPost, avgTimeSpent, avgRating } = props;
    
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
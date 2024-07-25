// mapped list of books
import Book from "./Book"

const BookList = (props) => {
    const {books} = props;
    return (
        <ul>
            {books && books.map((book) => (
                <Book 
                key={book.id}
                book={book}
                addWantToRead={addWantToRead}
                addReading={addReading}
                addRead={addRead}
                addFav={addFav}
                removeFav={removeFav}
                addPost={addPost}
                avgTimeSpent={avgTimeSpent} />
            ))}
        </ul>
    );
};

export default BookList;
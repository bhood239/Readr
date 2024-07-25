// mapped list of books
import Book from "./Book"

const BookList = (props) => {
    const {books} = props;
    return (
        <ul>
            {books && books.map((book) => (
                <Book key={book.id} data={book} />
            ))}
        </ul>
    );
};

export default BookList;
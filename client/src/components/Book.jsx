// individual book view
const Book = (props) => {

    return (
        <div>
            {/* img src comes from props */}
            <img className="book_cover" src={} alt={} />  
            <div>
                <div>
                    <div>
                        <span>{}</span>  {/* Book Name */}
                        <span>{}</span>  {/* Author Name */}
                    </div>
                    <div>
                        <span>{}</span>  {/* Rating */}
                        <span>{}</span>  {/* avg time spent */}
                    </div>
                </div>
                <div>
                    <button>Add To My Books</button>   {/* Add Onclick events to buttons */}
                    <button>Want To Read</button>
                    <button>Comment</button>
                </div>
            </div>
        </div>
    );
};

export default Book;
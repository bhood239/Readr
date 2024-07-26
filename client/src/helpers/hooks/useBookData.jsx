// This file will use axios to make requests to the books api
import axios from "axios";

export const getBookById = async (id) => {
  try {
    const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
    const bookData = res.data;
    const author =
      bookData.authors && bookData.authors.length > 0
        ? await getAuthorName(bookData.authors[0].key)
        : "Unknown Author";

    return {
      title: bookData.title || "No title available",
      description: bookData.description || "No description available",
      author: author || "No author available",
      cover:
        `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-M.jpg` ||
        "No cover available",
    };
  } catch (err) {
    console.log("Error:", err.message);
    return null;
  }
};

const getAuthorName = async (authorKey) => {
  try {
    const res = await axios.get(`https://openlibrary.org${authorKey}.json`);
    return res.data.name;
  } catch (err) {
    console.log("Error fetching author:", err.message);
    return "Unknown Author";
  }
};

const getBooksByName = async (name) => {
  try {
    const res = await axios.get(
      `https://openlibrary.org/search.json?q=${replaceSpacesWithPlus(name)}`
    );
    const bookKeys = res.data.docs.map((doc) => doc.key);

    const books = await Promise.all(
      bookKeys.map(async (key) => {
        return await getBookById(key);
      })
    );

    return books;
  } catch (err) {
    console.log("Error fetching books:", err.message);
    return "Unknown name";
  }
};

const replaceSpacesWithPlus = (name) => {
  return name.replace(/ /g, "+");
};

import React, { useEffect, useState } from "react";
import { getBooksByType } from "./book-search.service";

const BookSearch = () => {
  const [bookType, updateBookType] = useState("");
  const [allAvailableBooks, setAllAvailableBooks] = useState([]);
  async function requestBooks() {
    if (bookType) {
      const allBooks = await getBooksByType(bookType);
      setAllAvailableBooks(allBooks);
    }
  }

  useEffect(() => {
    async function getAllBooks() {
      await requestBooks();
    }
    getAllBooks();
  }, [bookType]);
  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestBooks();
        }}
      >
        <input
          className="full-width"
          autoFocus
          name="gsearch"
          type="search"
          value={bookType}
          placeholder="Search for books to add to your reading list"
          onChange={e => updateBookType(e.target.value)}
        />
      </form>
      {!bookType && (
        <div className="empty">
          <p>
            Try searching for a topic, for example
            <a
              onClick={() => {
                updateBookType("Javascript");
              }}
            >
              {" "}
              "Javascript"
            </a>
          </p>
        </div>
      )}
      <div>
        <pre>{JSON.stringify(allAvailableBooks, null, 4)}</pre>
      </div>
    </div>
  );
};

export default BookSearch;

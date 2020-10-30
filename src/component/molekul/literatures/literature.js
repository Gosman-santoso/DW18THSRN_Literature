import React, { useState, useEffect } from "react";

import { API } from "../../../config/api";
import { Link, useHistory } from "react-router-dom";

import "./literature.css";

function ListLiterature() {
  const history = useHistory();
  const [booksUser, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);

        const res = await API.get("/literatures");

        setBooks(res.data.data.literature);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadBooks();
  }, []);

  // console.log(booksUser);

  return (
    <div className="list-literature">
      <h1>List</h1>
      <ul>
        {loading || !booksUser ? (
          <h1> Loading... </h1>
        ) : (
          booksUser.map((book, index) => (
            <Link
              onClick={() => history.push(`/detail/${book.id}`)}
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>
                <img src={`${book.thumbnail}`} alt="book" />
                <h5> {book.title} </h5>
                <p> {book.author} </p>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
}
export default ListLiterature;

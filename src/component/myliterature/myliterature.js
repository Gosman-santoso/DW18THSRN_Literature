import React, { useState, useContext, useEffect } from "react";

import { API } from "../../config/api";
import { Context } from "../../context/context";

import "./myliterature.css";

function MyLiterature() {
  const [state, dispatch] = useContext(Context);

  // get book with id user
  const [booksUser, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // get book
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/user/${state.user?.id}`);

        setBooks(res.data.data.User.literature);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadBooks();
  }, []);

  return (
    <div className="list-book">
      <h1 style={{ marginTop: "2vh" }}>My Literatures</h1>
      <ul>
        {loading || !booksUser ? (
          <h1> Loading... </h1>
        ) : (
          booksUser.map((book, index) =>
            book.status == "Approved" ? (
              <li>
                <div style={{ marginTop: "5px" }}>
                  <img src={book.thumbnail} alt="" />
                  <h5>{book.title}</h5>
                  <p>{book.author}</p>
                </div>
              </li>
            ) : (
              <li>
                <div style={{ marginTop: "5px" }}>
                  <img src={book.thumbnail} alt="" />
                  <h5>{book.title}</h5>
                  <p>{book.author}</p>
                  <div className="overlay">
                    <h5>Waiting to be approved</h5>
                  </div>
                </div>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}

export default MyLiterature;

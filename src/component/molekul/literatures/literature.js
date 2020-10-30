import React, { useState, useEffect } from "react";

import { API, urlAsset } from "../../../config/api";
import { Link, useHistory } from "react-router-dom";
import SplashScreen from "../../../component/atom/splash/splash";

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

  return (
    <div className="list-literature">
      <h1>List</h1>
      <ul>
        {loading || !booksUser ? (
          <SplashScreen />
        ) : (
          booksUser.map(literature => (
            <Link
              onClick={() => history.push(`/detail/${literature.id}`)}
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>
                <img src={urlAsset.thumbnail + literature.thumbnail} alt="" />
                <h5> {literature.title} </h5>
                <p> {literature.author} </p>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
}
export default ListLiterature;

import React, { useState, useEffect, useContext } from "react";

import { API } from "../../config/api";
import { Context } from "../../context/context";

import { Link, useParams, useHistory } from "react-router-dom";

import "./detail.css";

function Detail() {
  // get Detail Book
  const { id } = useParams();
  const history = useHistory();

  const [detailBook, setDetailBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/literature/${id}`);

        setDetailBook(res.data.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadBooks();
  }, []);

  return (
    <div className="box-detail">
      <main>
        <div className="cover-detail">
          <img src={`${detailBook.thumbnail}`} alt="book" />
          <div className="des-detail">
            <h1>{detailBook.title}</h1>
            <p>{detailBook.user_id?.fullName}</p>
            <ul>
              <li>
                <h2>Publication date</h2>
                <p>{detailBook.publication_date}</p>
              </li>
              <li>
                <h2>Pages</h2>
                <p>{detailBook.pages}</p>
              </li>
              <li>
                <h2>ISBN</h2>
                <p>{detailBook.ISBN}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="about">
          <h1>About This Book</h1>
          <p>{detailBook.aboutBook}</p>

          <div className="boxBtn">
            <button className="active" type="submit">
              <a href="/somefile.txt" download>
                Click to download
              </a>
              {/* <p>{detailBook.attache}</p> */}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Detail;

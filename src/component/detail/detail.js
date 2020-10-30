import React, { useState, useEffect, useContext } from "react";

import { Context } from "../../context/context";
import { API } from "../../config/api";
import { useParams } from "react-router-dom";
import { AiOutlineCloudDownload } from "react-icons/ai";

import "./detail.css";
import Head from "../../component/head/head";
import BtnBookmark from "../molekul/btn-bookmark/bookmark";

function Detail() {
  // get Detail Book
  const { id } = useParams();

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

  // add library

  const [state, dispatch] = useContext(Context);

  const [formAdd, setFormAdd] = useState({
    literatureId: id,
    userId: state.user?.id
  });

  const [add, setAdd] = useState([]);

  const { literatureId, userId } = formAdd;

  const handleStore = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify({
        literatureId,
        userId
      });

      const res = await API.post("/libraries", body, config);

      setAdd([...add, res.data.data.library]);
      alert("Add to library");
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div className="box-detail">
      <Head />
      <main>
        <div className="thumb">
          <img src={detailBook.thumbnail} alt="book" />
        </div>
        <form onSubmit={e => handleStore(e)}>
          <BtnBookmark />
        </form>
        <ul>
          <li>
            <h1>{detailBook.title}</h1>
            <p>{detailBook.user_id?.fullName}</p>
          </li>

          <li>
            <h5>Publication date</h5>
            <p>{detailBook.publication_date}</p>
          </li>
          <li>
            <h5>Pages</h5>

            <p>{detailBook.pages}</p>
          </li>
          <li>
            <h5 style={{ color: "#AF2E1C" }}>
              <strong>ISBN</strong>
            </h5>
            <p>{detailBook.ISBN}</p>
          </li>
          <li>
            <a href={`${detailBook.file}`} download>
              <button className="active" type="submit">
                Download <AiOutlineCloudDownload />
              </button>
            </a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default Detail;

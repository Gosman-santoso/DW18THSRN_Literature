import React, { useState, useContext, useEffect } from "react";

import { API, urlAsset } from "../../config/api";
import { Context } from "../../context/context";
import { Link, useHistory } from "react-router-dom";

import "./myliterature.css";

function MyLiterature() {
  const history = useHistory();

  const [state, dispatch] = useContext(Context);

  // get book with id user
  const [literature, setLiterature] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // get book
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/user/${state.user?.id}`);

        setLiterature(res.data.data.User.literature);
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
      <h1>My Literatures</h1>
      <ul>
        {loading || !literature ? (
          <h1> Loading... </h1>
        ) : (
          literature.map(literature =>
            literature.status == "Approved" ? (
              <Link
                onClick={() => history.push(`/detail/${literature.id}`)}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <img src={urlAsset.thumbnail + literature.thumbnail} alt="" />
                  <h5>{literature.title}</h5>
                  <p>{literature.author}</p>
                </li>
              </Link>
            ) : (
              <li style={{ position: "relative", display: "block" }}>
                <img src={urlAsset.thumbnail + literature.thumbnail} alt="" />
                <h5>{literature.title}</h5>
                <p>{literature.author}</p>
                <div className="overlay">
                  <h3>Waiting to be approved</h3>
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

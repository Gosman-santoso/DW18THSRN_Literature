import React, { useState, useEffect, useContext } from "react";

import { API } from "../../config/api";
import { Context } from "../../context/context";
import { Link, useHistory } from "react-router-dom";

import Head from "../../component/head/head";
import SplashScreen from "../../component/atom/splash/splash";

import "./collection.css";

function Collection() {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();

  // get with user id
  const [library, setLibrary] = useState([]);
  const [literatureUser, setLiterature] = useState([]);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const res = await API.get("/libraries");

        setLibrary(res.data.data.library);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadLibrary();
  }, []);

  useEffect(() => {
    const loadLiterature = async () => {
      try {
        const res = await API.get(`/user/${state.user?.id}`);
        setDetail(res.data.data.User.library);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadLiterature();
  }, []);

  return (
    <div className="box-collection">
      <Head />
      <div className="list-literature">
        <h1>My Collection</h1>
        <ul>
          {loading || !literatureUser ? (
            <SplashScreen />
          ) : (
            detail.map((detail, index) => (
              // {console.log(bookUser)}

              <Link
                onClick={() => history.push(`/detail/${detail.id}`)}
                style={{ textDecoration: "none", color: "black" }}
              >
                <li>
                  <div>
                    <img src={detail.literature?.thumbnail} alt="literature" />
                    <h5>{detail.literature?.title}</h5>
                    <p>{detail.literature?.author}</p>
                  </div>
                </li>
              </Link>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Collection;

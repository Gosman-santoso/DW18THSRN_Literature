import React, { useState, useEffect, useContext } from "react";

import { API, urlAsset } from "../../config/api";
import { Context } from "../../context/context";
import { useHistory } from "react-router-dom";

import Head from "../../component/head/head";
import SplashScreen from "../../component/atom/splash/splash";

import "./collection.css";

function Collection() {
  const history = useHistory();
  const [state] = useContext(Context);

  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const res = await API.get(`/user/${state.user?.id}`);

        setCollection(res.data.data.User.library);
        console.log(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadCollection();
  }, []);

  return (
    <div className="box-collection">
      <Head />
      <div className="my-collection">
        <h1>My Collection</h1>
        <ul>
          {loading || !collection ? (
            <SplashScreen />
          ) : (
            collection.map(detail => (
              <div>
                <li
                  onClick={() =>
                    history.push(`/detail/${detail.literature?.id}`)
                  }
                >
                  <div>
                    <img
                      src={urlAsset.thumbnail + detail.literature?.thumbnail}
                      alt=""
                    />
                    <h5>{detail.literature?.title}</h5>
                    <p>{detail.literature?.author}</p>
                    <p>
                      {detail.literature?.publication_date != null && (
                        <small className="text-muted">
                          {detail.literature?.publication_date.slice(0, 4)}
                        </small>
                      )}
                    </p>
                  </div>
                </li>

                {/* <form onSubmit={e => handleRemove(e)}>
                  <input type="text" name="removeLibraryId" value={detail.id} />
                  <button type="submit">Remove</button>
                </form> */}
                {/* <BtnRemove /> */}
              </div>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Collection;

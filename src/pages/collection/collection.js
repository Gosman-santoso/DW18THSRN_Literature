import React, { useState, useEffect, useContext } from "react";

import { API, urlAsset } from "../../config/api";
import { Context } from "../../context/context";
import { Link, useHistory } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

import Head from "../../component/head/head";
import SplashScreen from "../../component/atom/splash/splash";
import BtnRemove from "../../component/molekul/btn-remove-collect/remove";

import "./collection.css";

function Collection() {
  const history = useHistory();
  const [state] = useContext(Context);

  const [Collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const res = await API.get(`/user/${state.user?.id}`);

        setCollection(res.data.data.User.library);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadCollection();
  }, []);

  // remove library
  // const [formRemove, setFormRemove] = useState({
  //   removeLibraryId: state.user?.library?.id
  // });

  // const [remove, setRemove] = useState([]);

  // const { removeLibraryId } = formRemove;

  // const handleRemove = async e => {
  //   e.preventDefault();
  //   try {
  //     await API.delete(`/library/${body}`);

  //     console.log(removeLibraryId);
  //     alert("succses");
  //   } catch (err) {
  //     console.log("ini error " + err);
  //   }
  // };

  return (
    <div className="box-collection">
      <Head />
      <div className="my-collection">
        <h1>My Collection</h1>
        <ul>
          {loading || !Collection ? (
            <SplashScreen />
          ) : (
            Collection.map(detail => (
              <div>
                <Link
                  onClick={() =>
                    history.push(`/detail/${detail.literature?.id}`)
                  }
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <li>
                    <div>
                      {/* <img
                        src={detail.literature?.thumbnail}
                        alt="literature"
                      /> */}
                      <img
                        src={urlAsset.thumbnail + detail.literature?.thumbnail}
                        alt=""
                      />
                      <h5>{detail.literature?.title}</h5>
                      <p>{detail.literature?.author}</p>
                    </div>
                  </li>
                </Link>

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

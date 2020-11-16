import React, { useState, useEffect, useContext } from "react";

import { Context } from "../../context/context";
import { API, urlAsset } from "../../config/api";
import { useParams } from "react-router-dom";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { useQuery, useMutation } from "react-query";

import Head from "../../component/head/head";
import SplashScreen from "../../component/atom/splash/splash";
import "./detail.css";

function Detail() {
  // get Detail Book
  const [state] = useContext(Context);
  const { id } = useParams();
  const idUser = state.user?.id;

  // get literature
  const { isLoading, data: literatureData } = useQuery("getLiterature", () =>
    API.get(`/literature/${id}`)
  );

  // get library
  const {
    isLoading: loadingLibrary,
    data: libraryData,
    refetch
  } = useQuery("getLibrary", () => API.get(`library/${id}/${idUser}`));

  // add library
  const [addLibrary] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const body = JSON.stringify({
        literatureId: id,
        userId: idUser
      });
      await API.post(`/libraries`, body, config);
      refetch();
    } catch (err) {
      alert(err);
      console.log(err);
    }
  });

  const [removeLibrary] = useMutation(async () => {
    try {
      await API.delete(`/library/${id}/${idUser}`);
      refetch();
    } catch (err) {
      alert(err);
      console.log(err);
    }
  });

  return (
    <div className="box-detail">
      <Head />
      {isLoading || loadingLibrary || !literatureData ? (
        <SplashScreen />
      ) : (
        <main>
          <div className="thumb">
            <img
              src={
                urlAsset.thumbnail +
                literatureData.data.data.literature.thumbnail
              }
              alt="book"
            />
          </div>
          <>
            {libraryData.data.data.library == null ? (
              <button
                className="bookmark active"
                style={{ position: "absolute", right: "0" }}
                onClick={() => addLibrary()}
              >
                Add Collection <FaRegBookmark />
              </button>
            ) : (
              <button
                className="bookmark active"
                style={{ position: "absolute", right: "0" }}
                onClick={() => removeLibrary()}
              >
                Remove Collection <FaRegBookmark />
              </button>
            )}
          </>
          <ul>
            <li>
              <h1>{literatureData.data.data.literature.title}</h1>
              <p>{literatureData.data.data.literature.user_id?.fullName}</p>
            </li>

            <li>
              <h5>Publication date</h5>
              <p>{literatureData.data.data.literature.publication_date}</p>
            </li>
            <li>
              <h5>Pages</h5>

              <p>{literatureData.data.data.literature.pages}</p>
            </li>
            <li>
              <h5 style={{ color: "#AF2E1C" }}>
                <strong>ISBN</strong>
              </h5>
              <p>{literatureData.data.data.literature.ISBN}</p>
            </li>
            <li>
              <a
                href={urlAsset.file + literatureData.data.data.literature.file}
                download
              >
                <button className="active" type="submit">
                  Download <AiOutlineCloudDownload />
                </button>
              </a>
            </li>
          </ul>
        </main>
      )}
    </div>
  );
}

export default Detail;

import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { API } from "../../../config/api";
import { Context } from "../../../context/context";
import { useQuery, useMutation } from "react-query";
import { FaRegBookmark } from "react-icons/fa";

import "./remove-add.css";

export const AddCollect = () => {
  const { id } = useParams();
  const [state] = useState(Context);
  const { isLoading, refetch } = useQuery("getLibrary", () =>
    API.get(`/library/5/${id}`)
  );

  const [handleStore] = useMutation(async e => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };

      const body = JSON.stringify({
        literatureId: id,
        userId: state.user?.id
      });

      await API.post(`/library/5/${id}`, body, config);
      refetch();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <button
          className="bookmark active"
          style={{ position: "absolute", right: "0" }}
          onClick={e => handleStore(e)}
        >
          Add Collect <FaRegBookmark />
        </button>
      )}
    </div>
  );
};

import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { Context } from "../../../context/context";
import { API } from "../../../config/api";

import "./remove.css";

export const RemoveCollect = () => {
  const { id } = useParams();
  const [state] = useState(Context);
  const [showAlert, setShowAlert] = useState(false);

  const handleRemove = async e => {
    e.preventDefault();
    try {
      await API.delete(`/literature/${state.user?.id}/${id}`);
      setShowAlert(true);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <form onSubmit={e => handleRemove(e)}>
      <button
        className="bookmark active"
        type="submit"
        style={{ position: "absolute", right: "0" }}
      >
        Remove Collection <FaRegBookmark />
      </button>
    </form>
  );
};

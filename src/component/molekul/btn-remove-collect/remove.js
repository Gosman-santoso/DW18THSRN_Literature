import React, { useState } from "react";

import { ImCancelCircle } from "react-icons/im";
import { Context } from "../../../context/context";
import { API } from "../../../config/api";

import "./remove.css";

const BtnRemove = () => {
  const [state] = useState(Context);

  const [formRemove, setFormRemove] = useState({
    libraryId: state.user?.library?.id
  });
  const [remove, setRemove] = useState([]);

  const { libraryId } = formRemove;
  const handleRemove = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify({
        libraryId
      });

      const res = await API.delete(`/library/${libraryId}`, body, config);

      setRemove([...remove, res.data.data.library]);
      alert("Succses");
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <form onSubmit={e => handleRemove(e)}>
      <button type="submit">
        <ImCancelCircle style={{ width: "100px", color: "red" }} />
      </button>
    </form>
  );
};

export default BtnRemove;

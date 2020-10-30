import React from "react";
import { FaRegBookmark } from "react-icons/fa";

import "./bookmark.css";

function BtnBookmark() {
  return (
    <div className="btn-bookmark">
      <button
        className="bookmark active"
        type="submit"
        style={{ position: "absolute", right: "0" }}
      >
        Add My Collection <FaRegBookmark />
      </button>
    </div>
  );
}

export default BtnBookmark;

import React from "react";
import { useHistory } from "react-router-dom";
import { urlAsset } from "../../../config/api";

const ListLiterature = ({ literature }) => {
  const history = useHistory();

  return (
    <div
      style={{ margin: "0 3vh" }}
      onClick={() => history.push(`/detail/${literature.id}`)}
    >
      <img src={urlAsset.thumbnail + literature.thumbnail} />
      <h5>{literature.title}</h5>
      <p>{literature.author}</p>
    </div>
  );
};

export default ListLiterature;

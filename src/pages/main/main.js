import React, { useState } from "react";

import { InputGroup, FormControl, Button } from "react-bootstrap";

import Head from "../../component/head/head";
import ListLiterature from "../../component/molekul/literatures/literature";
import BtnSearch from "../../component/btn-search/btnSearch";

import "./main.css";

function Main() {
  const [dataSearch, setDataSearch] = useState("");
  return (
    <div className="box-main">
      <Head />
      <main>
        <img src={require("../../asset/img/Vector.png")} alt="" />
        <div className="btn-search">
          <BtnSearch setQuery={dataSearch => setDataSearch(dataSearch)} />
        </div>
      </main>
      <ListLiterature />
    </div>
  );
}

export default Main;

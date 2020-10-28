import React from "react";

import { useParams } from "react-router-dom";

import ListSearch from "../../component/molekul/list-search/listSearch";
import Head from "../../component/head/head";
import BtnSearch from "../../component/btn-search/btnSearch";
import BtnCategory from "../../component/molekul/btn-category/btn-category";

import "./search.scss";

function Search() {
  const { url } = useParams();
  return (
    <div className="box-search">
      <Head />
      <main>
        <div className="list-btn-search">
          <BtnSearch />
          <div className="iniFlex">
            <BtnCategory />
            <ListSearch className="iniList" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Search;

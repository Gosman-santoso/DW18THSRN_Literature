import React, { useEffect, useState } from "react";

import { useParams, Link, useHistory } from "react-router-dom";
import { API } from "../../../config/api";

function ListSearch() {
  const { title } = useParams();
  const history = useHistory();

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLiteratures = async () => {
      try {
        const res = await API.get(`/search/${title}`);
        setSearchData(res.data.data.search);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadLiteratures();
  });

  return (
    <div className="box-list-search">
      <ul>
        {searchData == "" ? (
          <h3>Not Found</h3>
        ) : loading || !searchData ? (
          <h3>Loading...</h3>
        ) : (
          searchData.map((data, index) => (
            <Link
              onClick={() => history.push(`/detail/${data.id}`)}
              style={{ textDecoration: "none", color: "white" }}
            >
              <li>
                <div>
                  <img src={`${data.thumbnail}`} alt="" />
                  <h5>{data.title}</h5>
                  <p>{data.author}</p>
                </div>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
}

export default ListSearch;

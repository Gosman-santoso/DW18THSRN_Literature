import React, { useEffect, useState } from "react";

import { API, urlAsset } from "../../../config/api";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import TimePeriod from "../time-periode/timePeriod";
import Head from "../../head/head";
import BtnSearch from "../../btn-search/btnSearch";
import SplashScreen from "../../atom/splash/splash";

import "./searchResult.css";

const SearchResult = props => {
  const history = useHistory();
  const params = new URLSearchParams(props.location.search);

  const [searchQuery, setSearchQuery] = useState(params.get("title"));
  const [yearQuery, setYearQuery] = useState("");

  let propsLocation = props.location.search;

  useEffect(() => {
    refetch();
  }, [searchQuery, yearQuery]);

  const {
    isLoading,
    error,
    data: literatures,
    refetch
  } = useQuery("getLiteraturesSearch", () =>
    API.get(`/search${propsLocation}`)
  );
  if (isLoading) return <SplashScreen />;
  if (error) return "An error has occured: " + error.message;

  return (
    <div className="box-search-result">
      <Head />
      <div className="box-list-search">
        <BtnSearch
          setQuery={query => setSearchQuery(query)}
          isYear={yearQuery}
        />
        <div className="box-select-literature">
          <TimePeriod
            setYear={year => setYearQuery(year)}
            isQuery={searchQuery}
          />

          {/* <div className="box-list-literature">
            {literatures.data.literature.map(
              literature =>
                literature.status == "Approved" && (
                  <ListLiterature literature={literature} />
                )
            )}
          </div> */}

          <ul>
            {literatures.data.literature.map(literature => (
              <li onClick={() => history.push(`/detail/${literature.id}`)}>
                <img
                  src={urlAsset.thumbnail + literature.thumbnail}
                  alt="thumbnail"
                />
                <h5
                  style={{
                    display: "block",
                    maxHeight: "4.2vh",
                    overflowY: "hidden"
                  }}
                >
                  {literature.title}
                </h5>
                <p>{literature.author}</p>
                <p>
                  {literature.publication_date != null && (
                    <small className="text-muted">
                      {literature.publication_date.slice(0, 4)}
                    </small>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

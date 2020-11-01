import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { InputGroup, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

import "./btnSearch.css";

const BtnSearch = props => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    props.setQuery(searchQuery);
    props.isYear == undefined
      ? history.push(`/search?title=${searchQuery}`)
      : history.push(
          `/search?title=${searchQuery}&public_year=${props.isYear}`
        );
  };

  return (
    <div className="box-btn-search">
      <form onSubmit={e => handleSubmit(e)}>
        <InputGroup
          className="mb-3"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%"
          }}
        >
          <input
            placeholder="Search for literature"
            aria-label="Search for literature"
            type="search"
            style={{ borderRadius: "5px" }}
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
            }}
          />
          <Button
            variant="danger"
            type="submit"
            style={{
              marginLeft: "10px"
            }}
          >
            <BsSearch
              style={{
                color: "white",
                fontSize: "20px"
              }}
            />
          </Button>
        </InputGroup>
      </form>
    </div>
  );
};

export default BtnSearch;

import React, { useState, useEffect } from "react";

import { useHistory, Link } from "react-router-dom";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { API } from "../../config/api";

function BtnSearch() {
  const history = useHistory();

  const [search, setSearch] = useState(null);
  // const [literatures, setLiteratures] = useState([]);
  // const [loading, setLoading] = useState(true);

  // console.log(search);

  const handleSubmit = async e => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for literature"
            aria-label="Search for literature"
            aria-describedby="basic-addon2"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
            }}
            style={{ borderRadius: "5px" }}
          />
          <InputGroup.Append>
            <Link onClick={() => history.push(`/main/${search}`)}>
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
            </Link>
          </InputGroup.Append>
        </InputGroup>
      </form>
    </div>
  );
}

export default BtnSearch;

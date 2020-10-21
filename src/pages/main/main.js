import React from "react";

import { InputGroup, FormControl, Button } from "react-bootstrap";
import Head from "../../component/head/head";
import ListLiterature from "../../component/molekul/literatures/literature";

import "./main.css";

function Main() {
  return (
    <div className="box-main">
      <Head />
      <div className="box-search">
        <img src={require("../../asset/img/Vector.png")} alt="" />
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for literature"
            aria-label="Search for literature"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="danger">Button</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <main>
        <ListLiterature />
      </main>
    </div>
  );
}

export default Main;

import React, { useContext } from "react";

import { Link, useRouteMatch } from "react-router-dom";

import { Context } from "../../context/context";

// bootstrap
import { Nav } from "react-bootstrap";

import "./head.css";

const Head = () => {
  const [state, dispatch] = useContext(Context);
  // let path = ["/profile", "/collection", "/addLiterature", "/"];

  return (
    <div className="box-header">
      <nav>
        <Nav as="ul">
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                Profile
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/collection" style={{ textDecoration: "none" }}>
                My Collection
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/addLiterature" style={{ textDecoration: "none" }}>
                Add Literature
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link>
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  dispatch({
                    type: "LOGOUT"
                  });
                }}
              >
                Logout
              </Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Link to="/main">
          <div className="logo-img">
            <img src={require("../../asset/img/Group4.png")} alt="logo" />
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Head;

import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";

function HeaderAdm() {
  const [state, dispatch] = useContext(Context);
  return (
    <div
      style={{
        position: "relative",
        top: "0",
        zIndex: "13",
        width: "100%",
        background: "white"
      }}
    >
      <div
        style={{
          display: "flex",
          width: "75%",
          height: "13vh",
          margin: "auto",
          justifyContent: "space-between",
          // background: "salmon",
          alignItems: "center"
        }}
      >
        <Link to="/mainAdm" style={{ textDecoration: "none" }}>
          <div
            className="icon"
            style={{
              display: "flex"
            }}
          >
            <img
              style={{ width: "50px", height: "50px" }}
              src={require("../../asset/img/Group4.png")}
              alt=""
            />
          </div>
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "40vh",
            justifyContent: "space-between"
            // background: "lightgreen"
          }}
        >
          <ul
            style={{
              listStyle: "none",
              // background: "salmon",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "60%"
            }}
          ></ul>

          <Link
            to="/"
            style={{ color: "black" }}
            onClick={() => {
              dispatch({
                type: "LOGOUT"
              });
            }}
          >
            <li>Logout</li>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdm;

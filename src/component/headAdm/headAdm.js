import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import "./headAdm.css";

function HeaderAdm() {
  const [state, dispatch] = useContext(Context);
  return (
    <div className="box-headerAdm">
      <main>
        <Link to="/mainAdm" style={{ textDecoration: "none" }}>
          <div className="icon">
            <img
              style={{ width: "30vh" }}
              src={require("../../asset/img/Group4.png")}
              alt=""
            />
          </div>
        </Link>
        <Link
          to="/"
          onClick={() => {
            dispatch({
              type: "LOGOUT"
            });
          }}
        >
          Logout
        </Link>
      </main>
    </div>
  );
}

export default HeaderAdm;

import React from "react";

import "./landing.css";

// pages
import BtnLoginRegister from "../../component/atom/loginRegister";

function Landing() {
  return (
    <div className="box-landing">
      <div className="logo-img">
        <img src={require("../../asset/img/Group4.png")} alt="" />
      </div>

      <main>
        <div className="des">
          <h1>
            source <i>of</i> intelligence
          </h1>
          <p>
            Sign-up and receive unlimited accesss to all of your literatur -
            share your literature.
          </p>
          <BtnLoginRegister />
        </div>
        <div className="cover-img">
          <img src={require("../../asset/img/29971.png")} alt="" />
        </div>
      </main>
    </div>
  );
}

export default Landing;

import React from "react";

import Verify from "../../component/verify/verify";
import HeaderAdm from "../../component/headAdm/headAdm";

import "./mainAdm.css";

const AdmMain = () => {
  return (
    <div className="box-mainAdm">
      <HeaderAdm />
      <Verify />
    </div>
  );
};

export default AdmMain;

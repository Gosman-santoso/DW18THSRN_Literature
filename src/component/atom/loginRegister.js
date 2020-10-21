import React from "react";

import BtnLogin from "./../molekul/login/btn-login";
import BtnRegister from "./../molekul/register/btn-register";

function BtnLoginRegister() {
  return (
    <div style={{ display: "flex" }}>
      <BtnRegister />
      <BtnLogin />
    </div>
  );
}
export default BtnLoginRegister;

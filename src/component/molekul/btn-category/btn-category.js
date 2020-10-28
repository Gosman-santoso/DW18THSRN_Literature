import React from "react";

import "./btn-category.css";

function BtnCategory() {
  return (
    <div className="btn-category">
      <form>
        <select
          className="select-category"
          // value={gender}
          // onChange={e => {
          //   setFormAdd({ ...formAdd, gender: e.target.value });
          // }}
        >
          <option value="2020">Since 2020</option>
          <option value="2019">Since 2019</option>
        </select>
      </form>
    </div>
  );
}

export default BtnCategory;

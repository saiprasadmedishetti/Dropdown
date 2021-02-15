import React from "react";

function Checkbox({ checked , isdismiss}) {
  return (
    <div className="checkbox">
      <label>
        <input
          className="checkbox-input"
          type="checkbox"
          checked={checked}
          readOnly
        />
        <span className={`box ${isdismiss ? 'intimidate':''}`}></span>
      </label>
    </div>
  );
}

export default Checkbox;

import "../App.css";

import React from "react";

function Colors(props) {
  return (
    <div className="colors-component" key={props.index}>
      <div
        className="hex"
        style={{
          backgroundColor: props.element.hex
        }}
      >
        {props.element.hex}
      </div>
      <h2>{props.element.name}</h2>
      <img style={{ height: "15vh", width: "15vh" }} src={props.element.img} />
    </div>
  );
}

export default Colors;

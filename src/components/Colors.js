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
      <h4>{props.element.name}</h4>
      <img alt='color' className="colors-image" src={props.element.img} />
    </div>
    
  );
}

export default Colors;

import React from "react";

const Loader = ({style}) => {
  return <div className="lds-ellipsis" style={style}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
}

export default Loader;
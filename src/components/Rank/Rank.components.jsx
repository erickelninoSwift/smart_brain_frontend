import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div style={{ margin: "0px auto", textAlign: "center" }}>
      <div className="white f3 ">{`${
        name ? name.charAt(0).toUpperCase() + name.slice(1) : "Username"
      } , Your Current Entry Count is`}</div>
      <div className="white f1"> #{entries}</div>
    </div>
  );
};

export default Rank;

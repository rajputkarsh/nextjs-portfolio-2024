import React from "react";

const ReactSymbol = ({ color }: {color: string}) => {
  return (
    <div
      style={{
        fontSize: 120,
        fontFamily: "Apple Symbols",
        position: "absolute",
        top: "6%",
        left: 0,
        right: 0,
        textAlign: "center",
        color: color,
      }}
    >
      ⚛
    </div>
  );
};

export default ReactSymbol;

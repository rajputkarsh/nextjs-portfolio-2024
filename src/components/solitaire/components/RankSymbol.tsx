"use client";

import { CSSProperties, ReactNode } from "react";

const RankSymbol = ({
  symbol,
  style,
}: {
  symbol: ReactNode;
  style: CSSProperties;
}) => {
  return (
    <div
      style={{
        ...style,
        fontSize: 40,
        paddingTop: 57,
        margin: "auto",
        lineHeight: "55px",
        width: 50,
        height: 53,
        textAlign: "center",
      }}
    >
      {symbol}
    </div>
  );
};

export default RankSymbol;

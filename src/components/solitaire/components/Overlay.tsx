"use client";

import { DIMENSIONS } from "@/constants/solitaire";

const Overlay = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.3,
        width: DIMENSIONS.Card.width,
        height: DIMENSIONS.Card.height,
      }}
    />
  );
};

export default Overlay;

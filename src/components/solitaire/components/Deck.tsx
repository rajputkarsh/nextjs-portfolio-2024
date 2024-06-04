import React, { ReactNode } from "react";

const Deck = ({
  onClick = () => {},
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
};

export default Deck;

import { useState, useEffect } from "react";
import "./index.css";

interface CardHolderProps {
  isHighlighted: boolean;
}

function CardHolder({ isHighlighted }: CardHolderProps) {
  const [highlighted, sethighlighted] = useState("");
  useEffect(() => {
    if (isHighlighted) {
      sethighlighted(" cardholder__highlight");
    } else {
      sethighlighted("");
    }
  }, [isHighlighted]);
  return <div className={"cardholder" + highlighted}></div>;
}

export default CardHolder;

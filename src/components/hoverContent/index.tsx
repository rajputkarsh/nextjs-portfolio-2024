import { useState, useEffect } from "react";

interface IHoverContentProps {
  text: Array<string>;
}

function HoverContent({ text }: IHoverContentProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="hover-animated"
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: "translate(-50%, -50%)",
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        borderRadius: "5px",
        width: "20rem",
      }}
    >
      {
        text.length === 1
        ? (
          text[0]
        ) : (
          text.map((line, index) => <p key={`hover_text_${index}`}>{line}</p>)
        )
      }
    </div>
  );
}

export default HoverContent;

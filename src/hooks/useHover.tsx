import { useRef, useState, useEffect } from "react";

export default function useHover() {
  const hoverRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const enter = () => setIsHovered(true);
  const leave = () => setIsHovered(false);

  useEffect(() => {
    const refCopy = hoverRef;
    if (refCopy.current) {
      refCopy.current.addEventListener("mouseenter", enter);
      refCopy.current.addEventListener("mouseleave", leave);
    }
    return () => {
      if (refCopy.current) {
        refCopy.current.removeEventListener("mouseenter", enter);
        refCopy.current.removeEventListener("mouseleave", leave);
      }
    };
  }, []);

  return { hoverRef, isHovered };
}

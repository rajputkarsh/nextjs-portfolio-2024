import { useRef, useState, useEffect } from "react";
function useHover() {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const enter = () => setIsHovered(true);
  const leave = () => setIsHovered(false);
  useEffect(() => {
    const refCopy = ref;
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
  return [ref, isHovered];
}

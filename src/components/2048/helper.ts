import { useEffect } from "react";

export const useEvent = (
  event: string,
  handler: (event: any) => void,
  passive: boolean = false
) => {
  useEffect(() => {
    window.addEventListener(event, handler, passive);
    return () => window.removeEventListener(event, handler);
  });
};

export const getColor = (num: number) => {
  switch (num) {
    case 2:
      return "orange-50";
    case 4:
      return "yellow-100";
    case 8:
      return "orange-300";
    case 16:
      return "deep-orange-400";
    case 32:
      return "red-500";
    case 64:
      return "red-700";
    case 128:
      return "yellow-400";
    case 256:
      return "yellow-500";
    case 512:
      return "yellow-600";
    case 1024:
      return "yellow-700";
    case 2048:
      return "yellow-800";
    default:
      return "brown-100";
  }
};

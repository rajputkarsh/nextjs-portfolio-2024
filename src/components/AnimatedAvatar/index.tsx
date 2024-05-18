"use client";
import { useEffect } from "react";
import { loadModel } from "./functions";
import useHover from "@/hooks/useHover";
import HoverContent from "../HoverContent";
import { HOVER_MODEL_TEXT } from "@/constants/common";

export default function AnimatedAvatar() {
  const { hoverRef, isHovered } = useHover();

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <>
      <div id="avatar-container" ref={hoverRef} className="w-full h-full">
        <div id="avatar-loading"></div>
      </div>
      {isHovered && <HoverContent text={HOVER_MODEL_TEXT} />}
    </>
  );
}

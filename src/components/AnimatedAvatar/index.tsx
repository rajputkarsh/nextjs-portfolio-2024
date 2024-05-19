"use client";
import { ReactNode, useEffect, useState } from "react";
import HoverContent from "../HoverContent";
import { loadModel } from "./functions";
import useHover from "@/hooks/useHover";
import { HOVER_MODEL_TEXT } from "@/constants/common";

interface IAnimatedAvatarProps {
  fallback?: ReactNode
}

export default function AnimatedAvatar({ fallback }: IAnimatedAvatarProps) {
  const { hoverRef, isHovered } = useHover();
  const [isModelRendered, setModelRendered] = useState<boolean>(false);

  const handleModelRendered = () => {
    setModelRendered((_) => true);
  };

  useEffect(() => {
    loadModel(handleModelRendered);
  }, []);

  const shouldShowHover =
    isHovered === true && isModelRendered === true && window.innerWidth > 800;

  return (
    <>
      <div
        id="avatar-container"
        ref={hoverRef}
        className="w-full h-full flex flex-row justify-center"
      >
        <div id="avatar-loading">
          {!!fallback ? fallback : null}
        </div>
        {shouldShowHover ? <HoverContent text={HOVER_MODEL_TEXT} /> : null}
      </div>
    </>
  );
}

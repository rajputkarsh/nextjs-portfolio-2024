"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import HoverContent from "../HoverContent";
import { loadModel } from "./functions";
import useHover from "@/hooks/useHover";
import { HOVER_MODEL_TEXT } from "@/constants/common";
import CodingBoy from "@/assets/page/coding-boy.webp";

export default function AnimatedAvatar() {
  const { hoverRef, isHovered } = useHover();
  const [isModelRendered, setModelRendered] = useState<boolean>(false);

  const handleModelRendered = () => {
    setModelRendered((_) => true);
  }

  useEffect(() => {
    loadModel(handleModelRendered);
  }, []);

  const shouldShowHover = isHovered === true && isModelRendered === true && window.innerWidth > 800;

  return (
    <>
      <div
        id="avatar-container"
        ref={hoverRef}
        className="w-full h-full flex flex-row justify-center"
      >
        <div id="avatar-loading">
          <Image
            src={CodingBoy.src}
            alt=""
            width={700}
            height={700}
            loading="eager"
          />
        </div>
      </div>
      { shouldShowHover ? (
        <HoverContent text={HOVER_MODEL_TEXT} />
      ) : null}
    </>
  );
}

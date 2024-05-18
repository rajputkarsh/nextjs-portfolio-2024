"use client";
import Image from "next/image";
import { useEffect } from "react";
import HoverContent from "../HoverContent";
import { loadModel } from "./functions";
import useHover from "@/hooks/useHover";
import { HOVER_MODEL_TEXT } from "@/constants/common";
import CodingBoy from "@/assets/page/coding-boy.webp";

export default function AnimatedAvatar() {
  const { hoverRef, isHovered } = useHover();

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <>
      <div id="avatar-container" ref={hoverRef} className="w-full h-full">
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
      {isHovered && <HoverContent text={HOVER_MODEL_TEXT} />}
    </>
  );
}

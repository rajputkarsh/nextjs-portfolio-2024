"use client";
import { useEffect, useState } from "react";
import HoverContent from "../hoverContent";
import { loadModel } from "./functions";
import useHover from "@/hooks/useHover";
import { HOVER_MODEL_TEXT } from "@/constants/common";
import { TOTAL_DOWNLOAD_BYTES } from "./functions";
import Fallback from "./Fallback";


export default function AnimatedAvatar() {
  const { hoverRef, isHovered } = useHover();
  const [isModelRendered, setModelRendered] = useState<boolean>(false);
  const [downloadedBytes, setDownloadedBytes] = useState<number>(0);

  const handleProgress = (e: ProgressEvent) => {
    setDownloadedBytes((p) => p + (e?.loaded || 0));
  }

  const handleModelRendered = () => {
    setModelRendered((_) => true);
  };

  useEffect(() => {
    loadModel(handleModelRendered, handleProgress);
  }, []);

  const shouldShowHover =
    isHovered === true && isModelRendered === true && window.innerWidth > 800;

  console.log(`downloadedBytes -- `, downloadedBytes);

  return (
    <>
      <div
        id="avatar-container"
        ref={hoverRef}
        className="w-full h-full flex flex-row justify-center"
      >
        <div id="avatar-loading" className="mb-10">
          <Fallback text={Math.round(downloadedBytes/TOTAL_DOWNLOAD_BYTES).toString()} />
        </div>
        {shouldShowHover ? <HoverContent text={HOVER_MODEL_TEXT} /> : null}
      </div>
    </>
  );
}

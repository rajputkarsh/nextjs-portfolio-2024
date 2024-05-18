"use client";
import { useEffect } from "react";
import { loadModel } from "./functions";

export default function AnimatedAvatar() {

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <>
      <div id="avatar-container" className="w-full h-full">
        <div id="avatar-loading"></div>
      </div>
    </>
  );
}

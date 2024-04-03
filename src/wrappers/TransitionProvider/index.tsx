"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AnimatePresence } from "framer-motion";
import registerServiceWorkers from "@/service-worker";
import { motion } from "framer-motion";
import { removeHyphens } from "@/utils/common";
import config from "@/constants/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransitionProvider = ({
  children,
  noNavbar = false,
}: {
  children: ReactNode;
  noNavbar?: boolean;
}) => {
  let pathName = usePathname();
  const motionDivRef = useRef<HTMLDivElement>(null);

  if (pathName.includes("/")) {
    let pathNameEnd = pathName.split("/").at(-1) || "";
    if (pathNameEnd.length && pathNameEnd.length > 6) {
      pathNameEnd = pathName.split("/").at(-2) || "";
    }

    pathName = pathNameEnd;
  }

  useEffect(() => {
    registerServiceWorkers();
    setTimeout(() => {
      if (motionDivRef.current) {
        motionDivRef.current.style.display = "none";
      }
    }, 800);

    return () => {
      if (motionDivRef.current) {
        motionDivRef.current.style.display = "block";
      }
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className="w-screen bg-gradient-to-b from-blue-100 to-red-100 dark:from-zinc-800 dark:to-zinc-700 overflow-hidden"
      >
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-b-[100px] z-40"
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          ref={motionDivRef}
          className="fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-6xl md:text-8xl cursor-default z-50 w-fit h-fit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, display: "none" }}
          exit={{ opacity: 0, display: "none" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="capitalize">{`<${
            removeHyphens(pathName) || config.title
          } />`}</span>
        </motion.div>
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-t-[100px] bottom-0 z-30"
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        />
        {!noNavbar && (
          <div className="h-16 bg-blue-100 dark:bg-zinc-800 fixed z-10">
            <Navbar />
          </div>
        )}
        <div
          className={`${!noNavbar ? "min-h-[calc(100vh-12rem)] mt-28" : ""}`}
        >
          {children}
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;

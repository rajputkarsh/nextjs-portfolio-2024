"use client";

import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import config from "@/constants/config";
import Footer from "@/components/footer";

const TransitionProvider = ({
  children,
  noNavbar = false,
}: {
  children: ReactNode;
  noNavbar?: boolean;
}) => {
  const pathName = usePathname();
  const motionDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        className="w-screen bg-gradient-to-b from-blue-100 to-red-100 overflow-hidden"
      >
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-b-[100px] z-40"
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          ref={motionDivRef}
          className="fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-8xl cursor-default z-50 w-fit h-fit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {`<${
            pathName.substring(1)
              ? pathName.substring(1).toUpperCase()
              : config.title
          } />`}
        </motion.div>
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-t-[100px] bottom-0 z-30"
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        />
        {!noNavbar && (
          <div className="h-24">
            <Navbar />
          </div>
        )}
        <div className={`${!noNavbar ? "min-h-[calc(100vh-6rem)]" : ""}`}>
          {children}
        </div>
        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;

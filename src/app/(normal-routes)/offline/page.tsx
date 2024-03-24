'use client';

import Typewriter from "typewriter-effect";

function Offline() {
  return (
    <div className="w-screen h-[91vh] md:h-[90.5vh] flex flex-col gap-8 justify-center items-center">
      <h3 className="text-3xl md:text-4xl px-2 font-semibold underline-animation-black flex flex-row justify-center">
        Oops! It seems you're offline
      </h3>
      <h3 className="w-full px-4 text-2xl md:text-3xl font-semibold flex flex-row gap-2 justify-center">
        Retrying
        <Typewriter
          options={{
            strings: "...",
            autoStart: true,
            loop: true,
          }}
        />
      </h3>
    </div>
  );
}

export default Offline;

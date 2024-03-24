'use client';

import Typewriter from "typewriter-effect";

function Offline() {
  return (
    <div className="w-screen h-[91vh] md:h-[90.5vh] flex flex-col gap-8 justify-center items-center">
      <h3 className="text-4xl font-semibold underline-animation-black">
        Oops! It seems that you're offline.
      </h3>
      <h3 className="text-3xl font-semibold flex flex-row gap-2">
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

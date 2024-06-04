"use client";

import { useEffect } from "react";

interface InstallPWADialogProps {
  installPWA: () => void;
  closeDialog: () => void;
}

function InstallPWADialog({ installPWA, closeDialog }: InstallPWADialogProps) {
  useEffect(() => {
    window.localStorage.setItem("installDialogShown", "1");
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto px-4 md:px-8 opacity-100 visible top-[40%]  rounded-lg`}
    >
      <div className="relative mx-auto w-full max-w-2xl shadow-md bg-white">
        <div className="px-4 py-2 flex flex-row justify-between bg-theme-color text-white">
          <h1>Did you know ?</h1>
          <span className="cursor-pointer" onClick={closeDialog}>X</span>
        </div>
        <div className="p-4 dark:bg-slate-800">
          <h2 className="w-full text-center">
            <p> You can actually install this application</p>
            <p>
              with just the{" "}
              <span className="text-theme-color font-semibold">click</span> of a
              button.
            </p>
          </h2>
          <div className="w-full flex flex-row justify-evenly mt-4">
            <button
              type="button"
              className="text-theme-color py-1 px-4 border-2 rounded-lg border-theme-color hover:bg-theme-color hover:text-white duration-100"
              onClick={installPWA}
            >
              Install Now
            </button>
            <button
              type="button"
              className="text-theme-color py-1 px-4 border-2 rounded-lg border-theme-color hover:bg-theme-color hover:text-white duration-100"
              onClick={closeDialog}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstallPWADialog;
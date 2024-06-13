"use client";

interface YouWonProps {
  closeDialog: (arg0: boolean) => void;
}

function YouWon({ closeDialog }: YouWonProps) {

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto px-4 md:px-8 opacity-100 visible top-[30%]  rounded-lg`}
    >
      <div className="relative mx-auto w-full max-w-2xl shadow-md bg-white">
        <div className="px-4 py-2 flex flex-row justify-between bg-theme-color text-white">
          <h1>Game Completed</h1>
          <span className="cursor-pointer" onClick={() => closeDialog(false)}>
            X
          </span>
        </div>
        <div className="p-4 dark:bg-slate-800">
          <h2 className="w-full text-center">Congratulations! You won the game.</h2>
          <div className="w-full flex flex-row justify-evenly mt-4">
            <button
              type="button"
              className="text-theme-color py-1 px-4 border-2 rounded-lg border-theme-color hover:bg-theme-color hover:text-white duration-100"
              onClick={() => closeDialog(true)}
            >
              New Game
            </button>
            <button
              type="button"
              className="text-theme-color py-1 px-4 border-2 rounded-lg border-theme-color hover:bg-theme-color hover:text-white duration-100"
              onClick={() => closeDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouWon;

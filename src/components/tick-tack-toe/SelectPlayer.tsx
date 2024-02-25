interface SelectPlayerProps {
  xClick: () => void;
  oClick: () => void;
  mode: boolean;
}

function SelectPlayer({ xClick, oClick, mode }: SelectPlayerProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-4">
        {mode ? "Select Player" : "Select Character for Player 1"}
      </h1>
      <div className="flex flex-row gap-8 text-2xl font-bold capitalize">
        <button
          className="p-6 border-slate-500 border-2 rounded-xl"
          onClick={xClick}
        >
          X
        </button>
        <button
          className="p-6 border-slate-500 border-2 rounded-xl"
          onClick={oClick}
        >
          O
        </button>
      </div>
    </div>
  );
}

export default SelectPlayer;

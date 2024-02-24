import { getColor } from "./helper";

interface BlockProps {
  num: number;
}

function Block({ num }: BlockProps) {
  const getTextColor = () => (num === 2 || num === 4 ? "grey-800" : "brown-50");
  return (
    <div
      className={`bg-${getColor(
        num
      )} text-${getTextColor()} h-20 w-20 m-1 flex justify-center items-center text-5xl font-bold transition transform duration-300`}
    >
      {num !== 0 ? num : ""}
    </div>
  );
}

export default Block;

import { getColor } from "./helper";

interface BlockProps {
  num: number;
}

function Block({ num }: BlockProps) {
  const getTextColor = () => {
    if(num < 5) {
      return "grey-800";
    } else if( num >= 5 && num < 99) {
      return "white";
    } else {
      return "orange-950";
    }
  };
  return (
    <div
      className={`bg-${getColor(
        num
      )} text-${getTextColor()} h-20 w-20 m-1 flex justify-center items-center ${
        num > 99 ? "text-3xl" : "text-5xl"
      } font-bold transition transform duration-300`}
    >
      {num !== 0 ? num : ""}
    </div>
  );
}

export default Block;

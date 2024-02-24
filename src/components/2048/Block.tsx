import { getColor } from "./helper";

interface BlockProps {
  num: number;
}

function Block({ num }: BlockProps) {
  const getTextColor = () => (num === 2 || num === 4 ? "#645B52" : "#F7F4EF");
  return (
    <div
      className={`bg-[${getColor(
        num
      )}] text-color-[${getTextColor()}] h-20 w-20 m-1 flex justify-center items-center text-5xl font-bold`}
    >
      {num !== 0 ? num : ""}
    </div>
  );
}

export default Block;

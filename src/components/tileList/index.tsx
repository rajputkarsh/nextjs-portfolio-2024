import Image from "next/image";
import { Game } from "@/interfaces/game";
import { Project } from "@/interfaces/project";
import Link from "next/link";

interface TileListProps {
  list: Array<Game | Project>;
}

const isGame = (data: Game | Project): data is Game => "url" in data;
const isProject = (data: Game | Project): data is Project => "demoUrl" in data;

function TileList({ list }: TileListProps) {
  return (
    <>
      {list.map((item) => (
        <Link
          key={item.title}
          className="bg-slate-200 dark:bg-slate-800 p-4 border-2 border-slate-500 rounded-2xl w-full md:w-3/12"
          href={isGame(item) ? item?.url : item?.demoUrl || item?.sourceUrl}
          target="_blank"
        >
          <h4 className="text-theme-color font-semibold text:lg md:text-xl mb-4">
            {item.title}
          </h4>
          <Image
            className="mb-4 w-full max-h-40 object-contain m-auto"
            src={item.image}
            alt=""
            width={400}
            height={400}
          />
          <p className="text:lg md:text-xl">{item.body}</p>
        </Link>
      ))}
    </>
  );
}

export default TileList;

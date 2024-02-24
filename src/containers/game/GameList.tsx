import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchGameList } from "@/actions/game";
import config from "@/constants/config";
import { Game } from "@/interfaces/game";
import loader from "@/assets/loader.svg";

function GameList() {
  const [gameList, setGameList] = useState<Array<Game>>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGameList();
      setGameList(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full text-center">
      <h2 className="text-4xl my-8 font-bold text-theme-color underline-animation">
        {config.availablegames}
      </h2>

      {gameList ? (
        <div className="w-full flex flex-row flex-wrap justify-center gap-4 px-8 md:px-16">
          {gameList.map((game) => (
            <Link
              key={game.title}
              className="bg-slate-200 p-4 border-2 border-slate-500 rounded-2xl w-full md:w-3/12"
              href={game?.url}
              target="_blank"
            >
              <h4 className="text-theme-color font-semibold text:md md:text-xl mb-4">
                {game.title}
              </h4>
              <Image
                className="mb-4 w-full max-h-40 object-contain m-auto"
                src={game.image}
                alt=""
                width={400}
                height={400}
              />
              <p className="">{game.body}</p>
            </Link>
          ))}
        </div>
      ) : (
        <Image
          className="m-auto"
          src={loader.src}
          alt=""
          width={400}
          height={400}
        />
      )}
    </div>
  );
}

export default GameList;

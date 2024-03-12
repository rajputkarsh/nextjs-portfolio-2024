import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchGameList } from "@/actions/game";
import config from "@/constants/config";
import { Game } from "@/interfaces/game";
import loader from "@/assets/loader.svg";
import TileList from "@/components/tileList";

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
      <h2 className="text-3xl md:text-4xl my-8 font-bold text-theme-color underline-animation">
        {config.availablegames}
      </h2>

      {gameList ? (
        <div className="w-full flex flex-row flex-wrap justify-center gap-4 px-8 md:px-16">
          <TileList list={gameList} />
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

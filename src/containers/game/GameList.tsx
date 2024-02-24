import { useEffect, useState } from "react";
import { fetchGameList } from "@/actions/game";
import config from "@/constants/config";
import { Game } from "@/interfaces/game";

function GameList() {
  const [GameList, setGameList] = useState<Array<Game>>();

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
    </div>
  );
}

export default GameList;

import Image from "next/image";
import GamingBoy from "@/assets/gaming-boy.webp";
import config from "@/constants/config";

function GameIntroduction() {
  return (
    <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-12">
      <div className="h-1/2 lg:h-full lg:w-1/2 relative text-center flex flex-row justify-center">
        <Image src={GamingBoy.src} alt="" width={500} height={500} />
      </div>
      <div className=" px-8 mt-12 md:mt-0 lg:w-1/2 flex flex-col gap-4 justify-center">
        {config.gameDescriptionLines.map((text) => (
          <p key={text} className="text-lg md:text-2xl font-semibold">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default GameIntroduction;

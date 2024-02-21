import Image from "next/image";
import config from "@/constants/config";
import skills from "./skills";

function Skillset() {
  return (
    <div className="w-full text-center">
      <h2 className="text-6xl font-bold text-theme-color underline-animation">
        {config.skillset}
      </h2>
      <div className="w-full mt-8 flex flex-row gap-4 flex-wrap justify-center items-center">
        {Object.entries(skills).map(([skillType, skill], i) =>
          skill.map((skillInfo, j: number) => (
            <div className="w-2/12 aspect-square">
              <div>
                <Image
                  src={skillInfo.icon}
                  alt=""
                  width={100}
                  height={100}
                  className="h-[10vh] w-auto"
                />
              </div>
              <div title={skillInfo.name}>{skillInfo.name}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Skillset;

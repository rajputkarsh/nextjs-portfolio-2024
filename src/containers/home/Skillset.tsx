import Image from "next/image";
import config from "@/constants/config";
import skills from "@/constants/skills";

function Skillset() {
  return (
    <div className="w-full text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-theme-color underline-animation">
        {config.skillset}
      </h2>
      <div className="w-full my-8 px-8 md:px-16">
        <div className="flex flex-row gap-4 flex-wrap justify-center items-center py-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-500 rounded-2xl">
          {Object.entries(skills).map(([skillType, skill], i) =>
            skill.map((skillInfo, j: number) => (
              <div
                key={skillInfo.name}
                className="w-3/12 md:w-2/12 lg:w-1/12 aspect-square flex flex-col items-center justify-end gap-1"
                title={skillInfo.name}
              >
                <Image
                  src={skillInfo.icon}
                  title={skillInfo.name}
                  alt=""
                  width={70}
                  height={82}
                  className="max-h-[5vh] md:max-h-[7vh] w-auto"
                />
                <div className="mt-2 text-sm md:text-lg font-medium lg:font-semibold whitespace-nowrap">
                  {skillInfo.name}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Skillset;

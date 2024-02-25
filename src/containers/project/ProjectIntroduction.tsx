import Image from "next/image";
import ProjectWork from "@/assets/project-work.webp";
import config from "@/constants/config";

function ProjectIntroduction() {
  return (
    <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-12">
      <div className="h-1/2 lg:h-full lg:w-1/2 relative text-center flex flex-row justify-center">
        <Image src={ProjectWork.src} alt="" width={700} height={700} />
      </div>
      <div className=" px-8 mt-12 md:mt-0 lg:w-1/2 flex flex-col gap-4 justify-center">
        {config.projectDescriptionLines.map((text) => (
          <p key={text} className="text-lg md:text-xl font-semibold">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ProjectIntroduction;

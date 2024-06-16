import { useEffect, useState } from "react";
import Image from "next/image";
import TileList from "@/components/tileList";
import { fetchOtherProjects } from "@/actions/project";
import config from "@/constants/config";
import loader from "@/assets/loader.svg";
import { Project } from "@/interfaces/project";

function OtherProject() {
  const [otherProjects, setOtherProjects] = useState<Array<Project>>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOtherProjects();
      data.sort((project1, project2) => project2.index - project1.index);
      data.splice(0, 1);
      setOtherProjects(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl md:text-4xl my-8 font-bold text-theme-color underline-animation">
        {config.otherProjects}
      </h2>
      {otherProjects ? (
        <div className="w-full flex flex-row flex-wrap justify-center gap-4 px-8 md:px-16">
          <TileList list={otherProjects} />
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

export default OtherProject;

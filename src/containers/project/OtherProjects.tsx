import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchOtherProjects } from "@/actions/project";
import config from "@/constants/config";
import loader from "@/assets/loader.svg";
import { Project } from "@/interfaces/project";

function OtherProject() {
  const [otherProjects, setOtherProjects] = useState<Array<Project>>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOtherProjects();
      setOtherProjects(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full text-center">
      <h2 className="text-4xl my-8 font-bold text-theme-color underline-animation">
        {config.otherProjects}
      </h2>
      {otherProjects ? (
        <div className="w-full flex flex-row flex-wrap justify-center gap-4 px-8 md:px-16">
          {otherProjects.map((project) => (
            <Link
              key={project.title}
              className="bg-slate-200 p-4  rounded-2xl w-full md:w-3/12"
              href={project?.demoUrl || project?.sourceUrl}
              target="_blank"
            >
              <h4 className="text-theme-color font-semibold text:md md:text-xl mb-4">
                {project.title}
              </h4>
              <Image
                className="mb-4 w-full max-h-40 object-contain m-auto"
                src={project.image}
                alt=""
                width={400}
                height={400}
              />
              <p className="">{project.body}</p>
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

export default OtherProject;

import { useEffect, useState } from "react";
import Image from "next/image";
import loader from "@/assets/loader.svg";
import arrow from "@/assets/arrow.svg";
import { fetchLatestProject } from "@/actions/project";
import config from "@/constants/config";
import { Project } from "@/interfaces/project";
import Link from "next/link";

function LatestProject() {
  const [latestProject, setLatestProject] = useState<Project>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLatestProject();
      setLatestProject(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full text-center">
      <h2 className="text-4xl my-8 font-bold text-theme-color underline-animation">
        {config.latestProject}
      </h2>
      {latestProject ? (
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center">
            <h3 className="text-3xl font-semibold text-theme-color flex flex-row justify-center gap-2">
              {latestProject.title}
              <Link
                className="text-theme-color cursor-pointer"
                href={latestProject.demoUrl || latestProject.sourceUrl}
                target="_blank"
              >
                <Image src={arrow.src} alt="" width={20} height={20} />
              </Link>
            </h3>
            <h4 className="text-xl font-semibold">{latestProject.body}</h4>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              className="m-auto px-16 md:px-0"
              src={latestProject.image}
              alt=""
              width={600}
              height={600}
            />
          </div>
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

export default LatestProject;

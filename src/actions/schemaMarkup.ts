"use server";

import { fetchOtherProjects } from "./project";
import { PortfolioSchema, ProjectSchema } from "@/interfaces/schemaMarkup";
import config from "@/constants/config";
import { fetchGameList } from "./game";


export const generatePortfolioSchema = async (): Promise<PortfolioSchema> => {

  const projectList = await fetchOtherProjects();
  const gameList = await fetchGameList();

  const projects: Array<ProjectSchema> = projectList.map((projectData) => ({
    "@type": "SoftwareSourceCode",
    name: projectData.title,
    description: projectData.body,
    programmingLanguage: [
      "Typescript",
      "ReactJS",
      "NextJS",
      "NodeJS",
      "MongoDB",
    ],
    codeRepository: projectData.sourceUrl,
  }));

  const games: Array<Partial<ProjectSchema>> = gameList.map((gameData) => ({
    "@type": "SoftwareSourceCode",
    name: gameData.title,
    description: gameData.body,
    programmingLanguage: [
      "Typescript",
      "ReactJS",
      "NextJS",
      "NodeJS",
      "MongoDB",
    ],
    url: gameData.url,
  }));

  const portfolioSchema: PortfolioSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "#person",
        name: "Utkarsh",
        jobTitle: "Full Stack Developer",
        description:
          "MERN Stack Developer specializing in modern web technologies including Typescript, ReactJS, NodeJS, NextJS, MongoDB, PostgreSQL, MERN Stack",
        image: "https://www.utkarshrajput.com/icon-256x256.png",
        sameAs: [
          config.social.github,
          config.social.linkedin,
          config.social.stackoverflow,
          config.social.twitter,
        ],
        url: "https://www.utkarshrajput.com",
      },
      {
        "@type": "WebSite",
        "@id": "#website",
        url: "https://www.utkarshrajput.com",
        name: "Utkarsh Rajput: Full Stack Developer",
        description:
          "Utkarsh: Full Stack Developer - Typescript, ReactJS, NodeJS, NextJS, MongoDB, PostgreSQL, MERN Stack",
        publisher: {
          "@id": "#person",
        },
      },
      {
        "@type": "ItemList",
        "@id": "#projects",
        itemListElement: projects,
      },
      {
        "@type": "ItemList",
        "@id": "#games",
        itemListElement: games,
      },
      {
        "@type": "ProfilePage",
        "@id": "#profilepage",
        isPartOf: {
          "@id": "#website",
        },
        mainEntity: {
          "@id": "#person",
        },
      },
    ],
  };

  return portfolioSchema;
};
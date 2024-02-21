import jsLogo from "@/assets/logos/js.webp";
import tsLogo from "@/assets/logos/ts.webp";
import reactLogo from "@/assets/logos/react.webp";
import nextLogo from "@/assets/logos/next.webp";
import sassLogo from "@/assets/logos/sass.webp";
import tailwindLogo from "@/assets/logos/tailwind.webp";
import muiLogo from "@/assets/logos/mui.webp";
import reduxLogo from "@/assets/logos/redux.webp";
import recoilLogo from "@/assets/logos/recoil.webp";
import nodejsLogo from "@/assets/logos/nodejs.webp";
import expressLogo from "@/assets/logos/express.webp";
import nestLogo from "@/assets/logos/nest.webp";
import hapiLogo from "@/assets/logos/hapi.webp";
import mongodbLogo from "@/assets/logos/mongodb.webp";
import mysqlLogo from "@/assets/logos/mysql.webp";

export default {
  language: [
    {
      name: "Javascript",
      icon: jsLogo.src,
    },
    {
      name: "Typescript",
      icon: tsLogo.src,
    },
  ],
  frontend: [
    {
      name: "React.JS",
      icon: reactLogo.src,
    },
    {
      name: "Next.JS",
      icon: nextLogo.src,
    },
    {
      name: "SCSS",
      icon: sassLogo.src,
    },
    {
      name: "MaterialUI",
      icon: muiLogo.src,
    },
    {
      name: "Tailwind CSS",
      icon: tailwindLogo.src,
    },
  ],
  state_management: [
    {
      name: "Redux",
      icon: reduxLogo.src,
    },
    {
      name: "Recoil",
      icon: recoilLogo.src,
    },
  ],
  backend: [
    {
      name: "Node.JS",
      icon: nodejsLogo.src,
    },
    {
      name: "Express.JS",
      icon: expressLogo.src,
    },
    {
      name: "Nest.JS",
      icon: nestLogo.src,
    },
    {
      name: "Hapi.JS",
      icon: hapiLogo.src,
    },
  ],
  database: [
    {
      name: "MongoDB",
      icon: mongodbLogo.src,
    },
    {
      name: "MySQL",
      icon: mysqlLogo.src,
    },
  ],
  version_control: [
    {
      name: "Git",
      icon: sassLogo.src,
    },
    {
      name: "Gitlab",
      icon: sassLogo.src,
    },
    {
      name: "Github",
      icon: sassLogo.src,
    },
  ],
  misc: [
    {
      name: "GraphQL",
      icon: sassLogo.src,
    },
    {
      name: "Redis",
      icon: sassLogo.src,
    },
    {
      name: "Kafka",
      icon: sassLogo.src,
    },
    {
      name: "RabbitMQ",
      icon: sassLogo.src,
    },
    {
      name: "Firebase",
      icon: sassLogo.src,
    },
  ],
} as const;

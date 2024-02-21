import jsLogo from "@/assets/logos/js.webp";
import tsLogo from "@/assets/logos/ts.webp";
import reactLogo from "@/assets/logos/react.webp";
import nextLogo from "@/assets/logos/next.webp";
import sassLogo from "@/assets/logos/sass.webp";

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
      icon: sassLogo.src,
    },
    {
      name: "Tailwind CSS",
      icon: sassLogo.src,
    },
  ],
  state_management: [
    {
      name: "Redux",
      icon: sassLogo.src,
    },
    {
      name: "Recoil",
      icon: sassLogo.src,
    },
  ],
  backend: [
    {
      name: "Node.JS",
      icon: sassLogo.src,
    },
    {
      name: "Express.JS",
      icon: sassLogo.src,
    },
    {
      name: "Nest.JS",
      icon: sassLogo.src,
    },
    {
      name: "Hapi.JS",
      icon: sassLogo.src,
    },
  ],
  database: [
    {
      name: "MongoDB",
      icon: sassLogo.src,
    },
    {
      name: "MySQL",
      icon: sassLogo.src,
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

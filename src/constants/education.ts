import BabyFace from "@/assets//icons/baby-face.svg";
import School from "@/assets//icons/school.svg";

const EDUCATION_TIMELINE = [
  {
    index: 1,
    event: "BIRTH",
    icon: BabyFace.src,
    date: "1999",
    content: "",
    contentIcon: "",
  },
  {
    index: 2,
    event: "Became Matriculate",
    icon: "teenyicons:school-outline",
    date: "2015",
    content:
      "Completed my matriculation examination in 2015 with a score of 9.6 CGPA",
    contentIcon: BCM_LOGO,
  },
  {
    index: 3,
    event: "Became a High School Graduate",
    icon: "bxs:school",
    date: "2017",
    content:
      "Completed my AISSCE (12th Standard) examination in 2015 with a score of 83.4%",
    contentIcon: BCM_LOGO,
  },
  {
    index: 4,
    event: "Became an Engineer",
    icon: "material-symbols:school-outline-rounded",
    date: "2021",
    content:
      "Completed my Bachelors in Technology (Information Technology) in 2021 with an accumulative score of 8.48 CGPA",
    contentIcon: DAVIET_LOGO,
  },
  {
    index: 5,
    event: "Started specializing in Data Structures and Algorithms",
    icon: "fluent-mdl2:learning-tools",
    date: "2022",
    content: `Started my journey in Competitive Coding and DSA via Scaler Academy's Problem Solving & System Design course. Joined the September 2022 intake batch.`,
    contentIcon: SCALER_LOGO,
  },
  {
    index: 6,
    event: "PRESENT",
    icon: "bx:party",
    date: new Date().getFullYear().toString(),
    content: "",
    contentIcon: "",
  },
];

export default EDUCATION_TIMELINE;

import BcmLogo from "@/assets/images/bcm.webp";
import DavietLogo from "@/assets/images/daviet.webp";
import ScalerLogo from "@/assets/images/scaler.webp";

import BabyFace from "@/assets/icons/baby-face.svg";
import School from "@/assets/icons/school.svg";
import College from "@/assets/icons/college.svg";
import GraduationHat from "@/assets/icons/graduation-hat.svg";
import Graduation from "@/assets/icons/graduation.svg";
import PartyPopper from "@/assets/icons/party-popper.svg";

const EDUCATION_TIMELINE = [
  {
    index: 1,
    event: "BIRTH",
    icon: BabyFace.src,
    date: "1996",
    content: "",
    contentIcon: "",
  },
  {
    index: 2,
    event: "Became Matriculate",
    icon: School.src,
    date: "2012",
    content:
      "Completed my matriculation examination in 2015 with a score of 9.6 CGPA",
    contentIcon: BcmLogo.src,
  },
  {
    index: 3,
    event: "Became a High School Graduate",
    icon: College.src,
    date: "2014",
    content:
      "Completed my AISSCE (12th Standard) examination in 2015 with a score of 83.4%",
    contentIcon: BcmLogo.src,
  },
  {
    index: 4,
    event: "Became an Engineer",
    icon: GraduationHat.src,
    date: "2018",
    content:
      "Completed my Bachelors in Technology (Information Technology) in 2021 with an accumulative score of 8.48 CGPA",
    contentIcon: DavietLogo.src,
  },
  {
    index: 5,
    event: "Started specializing in Data Structures and Algorithms",
    icon: Graduation.src,
    date: "2022",
    content: `Started my journey in Competitive Coding and DSA via Scaler Academy's Problem Solving & System Design course. Joined the September 2022 intake batch.`,
    contentIcon: ScalerLogo.src,
  },
  {
    index: 6,
    event: "PRESENT",
    icon: PartyPopper.src,
    date: new Date().getFullYear().toString(),
    content: "",
    contentIcon: "",
  },
];

export default EDUCATION_TIMELINE;

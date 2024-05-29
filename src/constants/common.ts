import { ShortMonth, FullMonth } from "@/interfaces/common";
import { Metadata } from "next";

export const SHORT_MONTHS: { [key: number]: ShortMonth } = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC",
};

export const FULL_MONTHS: { [key: number]: FullMonth } = {
  1: "JANUARY",
  2: "FEBRUARY",
  3: "MARCH",
  4: "APRIL",
  5: "MAY",
  6: "JUNE",
  7: "JULY",
  8: "AUGUST",
  9: "SEPTEMBER",
  10: "OCTOBER",
  11: "NOVEMBER",
  12: "DECEMBER",
};

export const metadataObject: Metadata = {
  metadataBase: new URL("https://utkarshrajput.com"),
  title: "Utkarsh Rajput: Full Stack Developer",
  description:
    "Utkarsh: Full Stack Developer - Typescript, ReactJS, NodeJS, NextJS, MongoDB, PostgreSQL, MERN Stack",
  generator: "Utkarsh Rajput",
  applicationName: "Utkarsh Rajput",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Utkarsh",
    "React",
    "JavaScript",
    "Typescript",
    "ReactJS",
    "NodeJS",
    "NextJS",
    "MongoDB",
    "PostgreSQL",
    "MERN Stack",
  ],
  authors: [{ name: "Utkarsh" }],
  creator: "Utkarsh",
  publisher: "Utkarsh",

  openGraph: {
    name: "Utkarsh Rajput: Full Stack Developer",
    title: "Utkarsh Rajput: Full Stack Developer",
    description:
      "Utkarsh: Full Stack Developer - Typescript, ReactJS, NodeJS, NextJS, MongoDB, PostgreSQL, MERN Stack",
    url: new URL("https://utkarshrajput.com"),
  },
};

export const HOVER_MODEL_TEXT = [`Yep, That's me!`, `Try clicking on me or drag the platform.`]
